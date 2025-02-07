const db = require("../config/db");

const employeeAPI = {
  // Fetch all employees
  getAllEmployees: (req, res) => {
    console.log("Get All Employees");
    const query = `
      SELECT id, name, salary, contact_details, emergency_contact_1, 
             emergency_contact_2, photo, id_proof 
      FROM employee_table 
      WHERE deleted_at IS NULL
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({ success: false, message: "Error fetching employees." });
      }
      res.status(200).json({ success: true, data: results || [] });
    });
  },

  // Add a new employee
  createEmployee: (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);
  
      const { name, salary, contact_details, emergency_contact_1, emergency_contact_2 } = req.body;
      const photo = req.files?.photo?.[0]?.filename || null;
      const id_proof = req.files?.id_proof?.[0]?.filename || null;
  
      if (!name || !salary || !contact_details || !emergency_contact_1) {
        return res.status(400).json({ success: false, message: "All required fields must be provided." });
      }
  
      const query = `
        INSERT INTO employee_table (name, salary, contact_details, emergency_contact_1, emergency_contact_2, photo, id_proof)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [name, salary, contact_details, emergency_contact_1, emergency_contact_2 || null, photo, id_proof];
  
      db.query(query, values, (err) => {
        if (err) {
          console.error("SQL Error:", err.message, err.stack);
          return res.status(500).json({ success: false, message: "Database error occurred." });
        }
        res.status(201).json({ success: true, message: "Employee added successfully." });
      });
    } catch (err) {
      console.error("Unhandled Error:", err.message, err.stack);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  },

  // Update an employee
  updateEmployee: (req, res) => {
    const employeeId = req.params.id;
    const { name, salary, contact_details, emergency_contact_1, emergency_contact_2 } = req.body;
    const photo = req.files?.photo?.[0]?.filename || null;
    const id_proof = req.files?.id_proof?.[0]?.filename || null;

    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required." });
    }

    const query = `
      UPDATE employee_table 
      SET name = ?, salary = ?, contact_details = ?, emergency_contact_1 = ?, 
          emergency_contact_2 = ?, photo = ?, id_proof = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL
    `;
    const values = [name, salary, contact_details, emergency_contact_1, emergency_contact_2 || null, photo, id_proof, employeeId];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Error updating employee:", err);
        return res.status(500).json({ success: false, message: "Error updating employee." });
      }
      res.status(200).json({ success: true, message: "Employee updated successfully." });
    });
  },

  // Soft delete an employee
  deleteEmployee: (req, res) => {
    const employeeId = req.params.id;

    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required." });
    }

    const query = `
      UPDATE employee_table 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    db.query(query, [employeeId], (err) => {
      if (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ success: false, message: "Error deleting employee." });
      }
      res.status(200).json({ success: true, message: "Employee deleted successfully." });
    });
  },
};

module.exports = { employeeAPI };
