const db = require("../config/db");

const salaryAPI = {
  //Get all data
  getAllSalary: (req, res) => {
    const query = "SELECT * FROM salary_view ";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching salary:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching salary",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  // Create new data
  createSalary: (req, res) => {
    const { engineerId, salary, salaryDate, salaryMonth, salaryRemark } =
      req.body;

    if (!engineerId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = `
        INSERT INTO salarymaster
        (engineerId, salary, salaryDate, salaryMonth, salaryRemark) 
        VALUES (?, ?, ?, ?, ?)
      `;

    const values = [engineerId, salary, salaryDate, salaryMonth, salaryRemark];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating salary:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating salary",
        });
      }

      res.status(201).json({
        success: true,
        message: "Salary created successfully",
        data: { id: result.insertId },
      });
    });
  },

  //Update data
  updateSalary: (req, res) => {
    const salaryId = req.params.id;
    const updateData = req.body;

    // Remove any fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.deleted_at;

    // Create SET clause dynamically
    const updateFields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");

    const query = `
          UPDATE salarymaster
          SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
          WHERE salaryId = ? AND deleted_at IS NULL
        `;

    const values = [...Object.values(updateData), salaryId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating employee:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating salary",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Salary not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Salary updated successfully",
      });
    });
  },

  // Soft delete data
  deleteSalary: (req, res) => {
    const salaryId = req.params.id;
    const query = `
          UPDATE salarymaster
          SET deleted_at = CURRENT_TIMESTAMP
          WHERE salaryId = ? AND deleted_at IS NULL
        `;

    db.query(query, [salaryId], (err, result) => {
      if (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting salary",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Salary not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Salary deleted successfully",
      });
    });
  },
};

module.exports = { salaryAPI };
