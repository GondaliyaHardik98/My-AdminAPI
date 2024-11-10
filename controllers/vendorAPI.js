const db = require("../config/db");

const vendorAPI = {
  //Get all data
  getAllVendor: (req, res) => {
    const query = "SELECT * FROM vendormaster WHERE deleted_at IS NULL";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching vendor:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching vendor",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  // Create new data
  createVendor: (req, res) => {
    const {
      vendorName,
      vendorGSTNo,
      vendorMobileNo,
      vendorAddress,
      vendorRemark,
    } = req.body;

    // if (!vendorName) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Missing required fields",
    //   });
    // }

    const query = `
        INSERT INTO vendormaster
        (vendorName, vendorGSTNo, vendorMobileNo, vendorAddress, vendorRemark) 
        VALUES (?, ?, ?, ?, ?)
      `;

    const values = [
      vendorName,
      vendorGSTNo,
      vendorMobileNo,
      vendorAddress,
      vendorRemark,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating Vendor:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating Vendor",
        });
      }

      res.status(201).json({
        success: true,
        message: "Vendor created successfully",
        data: { id: result.insertId },
      });
    });
  },

  //Update data
  updateVendor: (req, res) => {
    const customerId = req.params.id;
    const updateData = req.body;

    // Remove any fields that shouldn't be updated directly
    delete updateData.vendorid;
    delete updateData.created_at;
    delete updateData.deleted_at;

    // Create SET clause dynamically
    const updateFields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");

    const query = `
              UPDATE vendormaster
              SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
              WHERE vendorId = ? AND deleted_at IS NULL
            `;

    const values = [...Object.values(updateData), customerId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating vendor:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating vendor",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "vendor not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "vendor updated successfully",
      });
    });
  },

  // Soft delete data
  deleteVendor: (req, res) => {
    const employeeId = req.params.id;
    const query = `
          UPDATE vendormaster
          SET deleted_at = CURRENT_TIMESTAMP
          WHERE vendorId = ? AND deleted_at IS NULL
        `;

    db.query(query, [employeeId], (err, result) => {
      if (err) {
        console.error("Error deleting vendor:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting vendor",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Vendor deleted successfully",
      });
    });
  },
};

module.exports = { vendorAPI };
