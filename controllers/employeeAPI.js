const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create upload directories if they don't exist
const createUploadDirs = () => {
  const dirs = ["uploads/employees/photos", "uploads/employees/documents"];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "photo") {
      cb(null, "uploads/employees/photos");
    } else {
      cb(null, "uploads/employees/documents");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const employeeAPI = {
  getAllEmployees: (req, res) => {
    const query = "SELECT * FROM employee_table WHERE deleted_at IS NULL";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching employees",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  getEmployeeById: (req, res) => {
    const employeeId = req.params.id;
    const query =
      "SELECT * FROM employee_table WHERE id = ? AND deleted_at IS NULL";

    db.query(query, [employeeId], (err, results) => {
      if (err) {
        console.error("Error fetching employee:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching employee",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      res.status(200).json({
        success: true,
        data: results[0],
      });
    });
  },

  createEmployee: async (req, res) => {
    try {
      const {
        name,
        salary,
        contact_details,
        emergency_contact_1,
        emergency_contact_2,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      // Get file paths
      const photoPath = req.files?.photo?.[0]?.path?.replace(/\\/g, "/");
      const idProofPath = req.files?.id_proof?.[0]?.path?.replace(/\\/g, "/");

      const query = `
        INSERT INTO employee_table 
        (name, salary, contact_details, emergency_contact_1, emergency_contact_2, photo, id_proof) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        name,
        salary,
        contact_details,
        emergency_contact_1,
        emergency_contact_2,
        photoPath,
        idProofPath,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          // Clean up uploaded files if database operation fails
          if (photoPath) fs.unlinkSync(photoPath);
          if (idProofPath) fs.unlinkSync(idProofPath);

          console.error("Error creating employee:", err);
          return res.status(500).json({
            success: false,
            message: "Error creating employee",
          });
        }

        res.status(201).json({
          success: true,
          message: "Employee created successfully",
          data: {
            id: result.insertId,
            name,
            photo: photoPath,
            id_proof: idProofPath,
          },
        });
      });
    } catch (error) {
      console.error("Error in createEmployee:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const updateData = { ...req.body };

      // Get file paths
      if (req.files?.photo) {
        updateData.photo = req.files.photo[0].path.replace(/\\/g, "/");
      }
      if (req.files?.id_proof) {
        updateData.id_proof = req.files.id_proof[0].path.replace(/\\/g, "/");
      }

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.created_at;
      delete updateData.deleted_at;

      // Get existing file paths
      const getExistingQuery =
        "SELECT photo, id_proof FROM employee_table WHERE id = ? AND deleted_at IS NULL";

      db.query(getExistingQuery, [employeeId], (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error updating employee",
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Employee not found",
          });
        }

        const existingEmployee = results[0];

        // Create SET clause
        const updateFields = Object.keys(updateData)
          .map((key) => `${key} = ?`)
          .join(", ");

        const query = `
          UPDATE employee_table 
          SET ${updateFields}, updated_at = CURRENT_TIMESTAMP 
          WHERE id = ? AND deleted_at IS NULL
        `;

        const values = [...Object.values(updateData), employeeId];

        db.query(query, values, (err, result) => {
          if (err) {
            console.error("Error updating employee:", err);
            return res.status(500).json({
              success: false,
              message: "Error updating employee",
            });
          }

          // Delete old files if they were replaced
          if (updateData.photo && existingEmployee.photo) {
            fs.unlink(existingEmployee.photo, (err) => {
              if (err) console.error("Error deleting old photo:", err);
            });
          }
          if (updateData.id_proof && existingEmployee.id_proof) {
            fs.unlink(existingEmployee.id_proof, (err) => {
              if (err) console.error("Error deleting old ID proof:", err);
            });
          }

          res.status(200).json({
            success: true,
            message: "Employee updated successfully",
          });
        });
      });
    } catch (error) {
      console.error("Error in updating Employee:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  deleteEmployee: (req, res) => {
    const employeeId = req.params.id;

    // First get the file paths
    const getFilesQuery =
      "SELECT photo, id_proof FROM employee_table WHERE id = ? AND deleted_at IS NULL";

    db.query(getFilesQuery, [employeeId], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error deleting employee",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      const { photo, id_proof } = results[0];

      const query = `
        UPDATE employee_table 
        SET deleted_at = CURRENT_TIMESTAMP 
        WHERE id = ? AND deleted_at IS NULL
      `;

      db.query(query, [employeeId], (err, result) => {
        if (err) {
          console.error("Error deleting employee:", err);
          return res.status(500).json({
            success: false,
            message: "Error deleting employee",
          });
        }

        // Delete associated files
        if (photo) {
          fs.unlink(photo, (err) => {
            if (err) console.error("Error deleting photo:", err);
          });
        }
        if (id_proof) {
          fs.unlink(id_proof, (err) => {
            if (err) console.error("Error deleting ID proof:", err);
          });
        }

        res.status(200).json({
          success: true,
          message: "Employee deleted successfully",
        });
      });
    });
  },
};

// Export both the API and the upload middleware
module.exports = {
  employeeAPI,
  uploadFields: upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "id_proof", maxCount: 1 },
  ]),
};
