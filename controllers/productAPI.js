const db = require("../config/db");

const productAPI = {
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

  getAllProductData: (req, res) => {
    const query = "SELECT * FROM product_view";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching Product:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching Product",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  // Create new data
  createProduct: (req, res) => {
    const {
      productCode,
      vendorId,
      productName,
      productDesription,
      productPrice,
      productQuantity,
      productRemark,
    } = req.body;

    if (!productCode) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = `
            INSERT INTO productmaster
            (productCode, vendorId, productName, productDesription, productPrice, productQuantity, productRemark)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;

    const values = [
      productCode,
      vendorId,
      productName,
      productDesription,
      productPrice,
      productQuantity,
      productRemark,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating product:", err);
        return res.status(500).json({
          success: false,
          message: "Error product customer",
        });
      }

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: { id: result.insertId },
      });
    });
  },

  //Update data
  updateProduct: (req, res) => {
    const productId = req.params.id;
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
              UPDATE productmaster
              SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
              WHERE productId = ? AND deleted_at IS NULL
            `;

    const values = [...Object.values(updateData), productId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating product",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    });
  },

  // Soft delete data
  deleteProduct: (req, res) => {
    const productId = req.params.id;
    const query = `
              UPDATE productmaster
              SET deleted_at = CURRENT_TIMESTAMP
              WHERE productId = ? AND deleted_at IS NULL
            `;

    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting prodcut",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Prodcut deleted successfully",
      });
    });
  },
};

module.exports = { productAPI };
