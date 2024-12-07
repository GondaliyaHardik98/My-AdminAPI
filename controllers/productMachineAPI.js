const db = require("../config/db");

const productMachineAPI = {
  //Get all vendor data
  getVendorCombo: (req, res) => {
    const query =
      "SELECT vendorId,vendorName FROM vendormaster WHERE deleted_at IS NULL";

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

  getAllProductMachineData: (req, res) => {
    const query = "SELECT * FROM productmaster_view";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching productMachine:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching productMachine",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  // Create new data
  createProductMachine: (req, res) => {
    const {
      productMachineCode,
      vendorId
    } = req.body;

    if (!productMachineCode) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = `
            INSERT INTO productMachineMaster
            (productMachineCode, vendorId)
            VALUES (?, ?)
          `;

    const values = [
      productMachineCode,
      vendorId
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating productMachine:", err);
        return res.status(500).json({
          success: false,
          message: "Error productMachine customer",
        });
      }

      res.status(201).json({
        success: true,
        message: "productMachine created successfully",
        data: { id: result.insertId },
      });
    });
  },

  //Update data
  updateProductMachine: (req, res) => {
    const productMachineId = req.params.id;
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
              UPDATE productMachineMaster
              SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
              WHERE productMachineId = ? AND deleted_at IS NULL
            `;

    const values = [...Object.values(updateData), productMachineId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating productMachine:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating productMachine",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "productMachine not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "productMachine updated successfully",
      });
    });
  },

  // Soft delete data
  deleteProductMachine: (req, res) => {
    const productMachineId = req.params.id;
    const query = `
              UPDATE productMachineMaster
              SET deleted_at = CURRENT_TIMESTAMP
              WHERE productMachineId = ? AND deleted_at IS NULL
            `;

    db.query(query, [productMachineId], (err, result) => {
      if (err) {
        console.error("Error deleting productMachine:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting prodcut",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "productMachine not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Prodcut deleted successfully",
      });
    });
  },
};

module.exports = { productMachineAPI };
