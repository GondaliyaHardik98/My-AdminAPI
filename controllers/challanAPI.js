const db = require("../config/db");

const challanAPI = {
  // Get all Customer data
  getCustomer: (req, res) => {
    const query = "SELECT customerId, name FROM customer_table WHERE deleted_at IS NULL";

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
        data: results || [],
      });
    });
  },

  // Get all Product data
  getProduct: (req, res) => {
    const query = "SELECT productId, productName, productPrice FROM productmaster WHERE deleted_at IS NULL";

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
        data: results || [],
      });
    });
  },

  // Get all Employee data
  getEmployee: (req, res) => {
    const query = "SELECT id AS engineerId, name FROM employee_table WHERE deleted_at IS NULL";

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
        data: results || [],
      });
    });
  },

  // Get all Challan data
  getAllChallan: (req, res) => {
    const query = `
      SELECT cm.challanId, cm.customerId, ct.name AS customerName, cm.engineerId,
             et.name AS engineerName, cm.challanDate AS date, cm.paymentType,
             GROUP_CONCAT(
               CONCAT(
                 '{"productId":', cp.productId, 
                 ',"productName":"', pm.productName, '",',
                 '"price":', IFNULL(cp.price, 'null'), 
                 ',"remark":"', IFNULL(cp.remark, ''), '"}'
               )
             ) AS products
      FROM challanmaster cm
      LEFT JOIN customer_table ct ON cm.customerId = ct.customerId
      LEFT JOIN employee_table et ON cm.engineerId = et.id
      LEFT JOIN challan_product cp ON cm.challanId = cp.challanId
      LEFT JOIN productmaster pm ON cp.productId = pm.productId
      WHERE cm.deleted_at IS NULL
      GROUP BY cm.challanId
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching challan:", err);
        return res.status(500).json({
          success: false,
          message: "Error fetching challan",
        });
      }

      const formattedResults = results.map((row) => {
        return {
          ...row,
          products: row.products ? JSON.parse(`[${row.products}]`) : [],
        };
      });

      res.status(200).json({
        success: true,
        data: formattedResults || [],
      });
    });
  },

  // Get Challan by ID
  getChallanById: (req, res) => {
    const challanId = req.params.id;
    const query = `
      SELECT cm.challanId, cm.customerId, cm.engineerId, cm.challanDate AS date, 
             cm.paymentType,
             GROUP_CONCAT(
               CONCAT(
                 '{"productId":', cp.productId, 
                 ',"productName":"', pm.productName, '",',
                 '"price":', IFNULL(cp.price, 'null'), 
                 ',"remark":"', IFNULL(cp.remark, ''), '"}'
               )
             ) AS products
      FROM challanmaster cm
      LEFT JOIN challan_product cp ON cm.challanId = cp.challanId
      LEFT JOIN productmaster pm ON cp.productId = pm.productId
      WHERE cm.challanId = ? AND cm.deleted_at IS NULL
      GROUP BY cm.challanId
    `;

    db.query(query, [challanId], (err, results) => {
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

      const formattedResult = {
        ...results[0],
        products: results[0].products ? JSON.parse(`[${results[0].products}]`) : [],
      };

      res.status(200).json({
        success: true,
        data: formattedResult,
      });
    });
  },

  // Create Challan
  createChallan: (req, res) => {
    const { customerId, engineerId, challanDate, paymentType, products } = req.body;

    if (!customerId || !engineerId || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const query = `
      INSERT INTO challanmaster (customerId, engineerId, challanDate, paymentType)
      VALUES (?, ?, ?, ?)
    `;
    const challanValues = [customerId, engineerId, challanDate, paymentType];

    db.query(query, challanValues, (err, result) => {
      if (err) {
        console.error("Error creating challan:", err);
        return res.status(500).json({ success: false, message: "Error creating challan." });
      }

      const challanId = result.insertId;

      const productQuery = `
        INSERT INTO challan_product (challanId, productId, price, remark)
        VALUES ?
      `;
      const productValues = products.map((p) => [
        challanId,
        p.productId,
        p.price,
        p.remark,
      ]);

      db.query(productQuery, [productValues], (err) => {
        if (err) {
          console.error("Error adding products:", err);
          return res.status(500).json({
            success: false,
            message: "Error adding products to challan",
          });
        }

        res.status(201).json({
          success: true,
          message: "Challan created successfully",
        });
      });
    });
  },

  // Update Challan
  updateChallan: (req, res) => {
    const challanId = req.params.id;
    const { customerId, engineerId, challanDate, paymentType, products } = req.body;

    if (!challanId || !customerId || !engineerId || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const challanQuery = `
      UPDATE challanmaster
      SET customerId = ?, engineerId = ?, challanDate = ?, paymentType = ?
      WHERE challanId = ?
    `;
    const challanValues = [customerId, engineerId, challanDate, paymentType, challanId];

    db.query(challanQuery, challanValues, (err) => {
      if (err) {
        console.error("Error updating challan:", err);
        return res.status(500).json({ success: false, message: "Error updating challan." });
      }

      const deleteProductQuery = "DELETE FROM challan_product WHERE challanId = ?";
      db.query(deleteProductQuery, [challanId], (err) => {
        if (err) {
          console.error("Error deleting products:", err);
          return res.status(500).json({ success: false, message: "Error updating products." });
        }

        const productQuery = `
          INSERT INTO challan_product (challanId, productId, price, remark)
          VALUES ?
        `;
        const productValues = products.map((p) => [
          challanId,
          p.productId,
          p.price,
          p.remark,
        ]);

        db.query(productQuery, [productValues], (err) => {
          if (err) {
            console.error("Error updating products:", err);
            return res.status(500).json({
              success: false,
              message: "Error updating products in challan",
            });
          }

          res.status(200).json({
            success: true,
            message: "Challan updated successfully",
          });
        });
      });
    });
  },

  // Delete Challan
  deleteChallan: (req, res) => {
    const challanId = req.params.id;

    const query = `
      UPDATE challanmaster
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE challanId = ?
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
          message: "Challan not found or already deleted.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Challan deleted successfully.",
      });
    });
  },
};

module.exports = { challanAPI };
