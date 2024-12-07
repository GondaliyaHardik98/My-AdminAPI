const db = require("../config/db");

const customerAPI = {
  //Get all data
  getAllCustomers: (req, res) => {
    const query = "SELECT * FROM customer_table WHERE deleted_at IS NULL";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching customer:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching customer",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  //Get data by ID
  getCustomerById: (req, res) => {
    const customerId = req.params.id;
    const query =
      "SELECT * FROM customer_table WHERE customerId = ? AND deleted_at IS NULL";

    db.query(query, [customerId], (err, results) => {
      if (err) {
        console.error("Error fetching customer:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching customer",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.status(200).json({
        success: true,
        data: results[0],
      });
    });
  },

  // Create new data
  createCustomer: (req, res) => {
    const { name, gstNo, mobileNo, address, remark } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = `
        INSERT INTO customer_table
        (name, gstNo, mobileNo, address, remark) 
        VALUES (?, ?, ?, ?, ?)
      `;

    const values = [name, gstNo, mobileNo, address, remark];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating customer:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating customer",
        });
      }

      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: { id: result.insertId },
      });
    });
  },

  //Update data
  updateCustomer: (req, res) => {
    const customerId = req.params.id;
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
          UPDATE customer_table
          SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
          WHERE customerId = ? AND deleted_at IS NULL
        `;

    const values = [...Object.values(updateData), customerId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating customer:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating customer",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Customer updated successfully",
      });
    });
  },

  // Soft delete data
  deleteEmployee: (req, res) => {
    const customerId = req.params.id;
    const query = `
          UPDATE customer_table
          SET deleted_at = CURRENT_TIMESTAMP
          WHERE customerId = ? AND deleted_at IS NULL
        `;

    db.query(query, [customerId], (err, result) => {
      if (err) {
        console.error("Error deleting customer:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting customer",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
      });
    });
  },
};

module.exports = { customerAPI };
