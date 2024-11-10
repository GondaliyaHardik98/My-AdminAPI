const db = require("../config/db");

const challanAPI = {
  //Get all Customer data
  getCustomer: (req, res) => {
    const query =
      "SELECT customerId, name FROM customer_table WHERE deleted_at IS NULL";

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

  //Get all Product data
  getProduct: (req, res) => {
    const query =
      "SELECT productId, productName FROM productmaster WHERE deleted_at IS NULL";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching product",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  //Get all Employee data
  getEmployee: (req, res) => {
    const query =
      "SELECT id AS engineerId, name FROM employee_table WHERE deleted_at IS NULL";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching employee:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching employee",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  //Get all data
  getAllChallan: (req, res) => {
    const query = "SELECT * FROM challan_view";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching challan:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching challan",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  // Create new data
  createChallan: (req, res) => {
    const {
      customerId,
      productId,
      engineerId,
      challanPrice,
      challanDate,
      challanRemark,
    } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = `
        INSERT INTO challanmaster
        (customerId, productId, engineerId, challanPrice, challanDate, challanRemark) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    const values = [
      customerId,
      productId,
      engineerId,
      challanPrice,
      challanDate,
      challanRemark,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating challan:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating challan",
        });
      }

      res.status(201).json({
        success: true,
        message: "challan created successfully",
        data: { id: result.insertId },
      });
    });
  },

  //Update data
  updateChallan: (req, res) => {
    const challanId = req.params.id;
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
          UPDATE challanmaster
          SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
          WHERE challanId = ? AND deleted_at IS NULL
        `;

    const values = [...Object.values(updateData), challanId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating challan:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating challan",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Challan not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Challan updated successfully",
      });
    });
  },

  // Soft delete data
  deleteChallan: (req, res) => {
    const challanId = req.params.id;
    const query = `
          UPDATE challanmaster
          SET deleted_at = CURRENT_TIMESTAMP
          WHERE customerId = ? AND deleted_at IS NULL
        `;

    db.query(query, [challanId], (err, result) => {
      if (err) {
        console.error("Error deleting challan:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting challan",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Challan not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Challan deleted successfully",
      });
    });
  },
};

module.exports = { challanAPI };
