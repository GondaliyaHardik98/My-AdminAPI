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

  //Get data by ID
  getChallanById: (req, res) => {
    const customerId = req.params.id;
    const query =
      "SELECT * FROM challanmaster WHERE customerId = ? AND deleted_at IS NULL";

    db.query(query, [customerId], (err, results) => {
      if (err) {
        console.error("Error fetching challan:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching challan",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Challan not found",
        });
      }

      // Ensure the response is always an array
      res.status(200).json({
        success: true,
        data: Array.isArray(results) ? results : [results],
      });
    });
  },

  createChallan: (req, res) => {
    console.log("Received request body:", req.body);

    // Ensure the outer structure is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of challan arrays",
        receivedData: req.body,
      });
    }

    // Flatten the input array of arrays
    const challanData = req.body.flat();

    // Prepare batch insert query
    const query = `
      INSERT INTO challanmaster
      (customerId, productId, engineerId, challanPrice, challanDate, challanRemark) 
      VALUES ?
    `;

    // Prepare values for batch insert
    const values = challanData.map((challan) => [
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

      res.status(201).json({
        success: true,
        message: "Challan created successfully",
        data: result,
      });
    });
  },

  //Update data
  updateChallan: (req, res) => {
    const customerId = req.params.id;
    const challanData = req.body;

    if (!Array.isArray(challanData) || challanData.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid request format. Expecting an array of challan entries",
      });
    }

    // Start a transaction
    db.beginTransaction(async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error starting transaction",
          error: err.message,
        });
      }

      try {
        // 1. Soft delete existing records that are not in the update list
        const challanIds = challanData
          .filter((item) => item.challanId)
          .map((item) => item.challanId);

        let deleteQuery;
        let deleteParams;

        if (challanIds.length > 0) {
          // If we have challanIds, exclude them from deletion
          deleteQuery = `
            UPDATE challanmaster 
            SET deleted_at = CURRENT_TIMESTAMP 
            WHERE customerId = ? 
            AND deleted_at IS NULL 
            AND challanId NOT IN (${challanIds.map(() => "?").join(",")})
          `;
          deleteParams = [customerId, ...challanIds];
        } else {
          // If no challanIds, soft delete all records for this customer
          deleteQuery = `
            UPDATE challanmaster 
            SET deleted_at = CURRENT_TIMESTAMP 
            WHERE customerId = ? 
            AND deleted_at IS NULL
          `;
          deleteParams = [customerId];
        }

        await new Promise((resolve, reject) => {
          db.query(deleteQuery, deleteParams, (err) =>
            err ? reject(err) : resolve()
          );
        });

        // 2. Update existing records and insert new ones
        for (const item of challanData) {
          const query = item.challanId
            ? `
              UPDATE challanmaster 
              SET 
                productId = ?,
                engineerId = ?,
                challanPrice = ?,
                challanDate = ?,
                challanRemark = ?,
                updated_at = CURRENT_TIMESTAMP,
                deleted_at = NULL
              WHERE challanId = ? AND customerId = ?
            `
            : `
              INSERT INTO challanmaster 
              (customerId, productId, engineerId, challanPrice, challanDate, challanRemark)
              VALUES (?, ?, ?, ?, ?, ?)
            `;

          const values = item.challanId
            ? [
                item.productId,
                item.engineerId,
                item.challanPrice,
                item.challanDate || new Date().toISOString().split("T")[0],
                item.challanRemark,
                item.challanId,
                customerId,
              ]
            : [
                customerId,
                item.productId,
                item.engineerId,
                item.challanPrice,
                item.challanDate || new Date().toISOString().split("T")[0],
                item.challanRemark,
              ];

          await new Promise((resolve, reject) => {
            db.query(query, values, (err) => (err ? reject(err) : resolve()));
          });
        }

        // Commit transaction
        db.commit((err) => {
          if (err) {
            throw err;
          }

          res.status(200).json({
            success: true,
            message: "Challan updated successfully",
          });
        });
      } catch (error) {
        // Rollback on error
        db.rollback(() => {
          console.error("Error in update transaction:", error);
          res.status(500).json({
            success: false,
            message: "Error updating challan",
            error: error.message,
          });
        });
      }
    });
  },

  // Soft delete data
  deleteChallan: (req, res) => {
    const challanId = req.params.id;
    const query = `
          UPDATE challanmaster
          SET deleted_at = CURRENT_TIMESTAMP
          WHERE challanId = ? AND deleted_at IS NULL
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
