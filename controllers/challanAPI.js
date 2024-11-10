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

  createChallan: (req, res) => {
    console.log("Received request body:", req.body);

    // Ensure request body is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of challan objects",
        receivedData: req.body,
      });
    }

    // Prepare batch insert query
    const query = `
      INSERT INTO challanmaster
      (customerId, productId, engineerId, challanPrice, challanDate, challanRemark) 
      VALUES ?
    `;

    // Prepare values for batch insert
    const values = req.body.map((challan) => [
      challan.customerId,
      challan.productId,
      challan.engineerId || null,
      challan.challanPrice || null,
      challan.challanDate || new Date().toISOString().split("T")[0],
      challan.challanRemark || null,
    ]);

    console.log("Executing batch insert with values:", values);

    // Execute batch insert
    db.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error creating challans:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating challans",
          error: err.message,
        });
      }
    });
  },

  //Update data
  updateChallan: (req, res) => {
    const challanId = req.params.id;
    const updateData = req.body;

    console.log("Received update data:", updateData); // Debugging log

    // Remove any fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.deleted_at;

    // Filter out non-primitive values
    const filteredUpdateData = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (typeof value !== "object" || value === null) {
        filteredUpdateData[key] = value;
      } else {
        console.warn(
          `Skipping field ${key} because it is not a primitive value.`
        );
      }
    }

    // Check if there are fields to update
    const updateFields = Object.keys(filteredUpdateData)
      .map((key) => `${key} = ?`)
      .join(", ");

    if (!updateFields) {
      console.error("No valid fields to update.");
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const query = `
      UPDATE challanmaster
      SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
      WHERE challanId = ? AND deleted_at IS NULL
    `;

    const values = [...Object.values(filteredUpdateData), challanId];

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
