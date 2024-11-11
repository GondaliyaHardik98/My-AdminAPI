const db = require("../config/db");

const sellAPI = {
  getAMCData: (req, res) => {
    const query = "SELECT * FROM amcrecord WHERE deleted_at IS NULL";

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

  getAllSellData: (req, res) => {
    const query = "SELECT * FROM sell_view";

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
  createSell: (req, res) => {
    const {
      productId,
      customerId,
      sellDate,
      sellPrice,
      sellQuantity,
      sellRemark,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // First query to insert into sellmaster
    const sellmasterQuery = `
      INSERT INTO sellmaster
      (productId, customerId, sellDate, sellPrice, sellQuantity, sellRemark)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const sellmasterValues = [
      productId,
      customerId,
      sellDate,
      sellPrice,
      sellQuantity,
      sellRemark,
    ];

    db.query(sellmasterQuery, sellmasterValues, (err, sellResult) => {
      if (err) {
        console.error("Error creating sell:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating sell",
        });
      }

      const sellId = sellResult.insertId; // Get the ID of the new sell record

      // Calculate AMCDate as sellDate + 365 days
      const amcDateQuery = `DATE_ADD(?, INTERVAL 365 DAY)`;

      // Second query to insert into AMCREcord
      const amcRecordQuery = `
        INSERT INTO AMCREcord
        (SellID, AMCDate)
        VALUES (?, ${amcDateQuery})
      `;

      const amcRecordValues = [sellId, sellDate];

      db.query(amcRecordQuery, amcRecordValues, (amcErr, amcResult) => {
        if (amcErr) {
          console.error("Error creating AMC record:", amcErr);
          return res.status(500).json({
            success: false,
            message: "Error creating AMC record",
          });
        }

        res.status(201).json({
          success: true,
          message: "Sell and AMC record created successfully",
          data: { sellId: sellResult.insertId, amcId: amcResult.insertId },
        });
      });
    });
  },

  //   //Update data
  updateSell: (req, res) => {
    const { id } = req.params; // Sell ID
    const {
      productId,
      customerId,
      sellDate,
      sellPrice,
      sellQuantity,
      sellRemark,
    } = req.body;

    if (!sellDate) {
      return res.status(400).json({
        success: false,
        message: "sellDate is required for updating AMCDate",
      });
    }

    // Update the sellmaster table with all provided fields
    const updateSellmasterQuery = `
      UPDATE sellmaster
      SET productId = ?, customerId = ?, sellDate = ?, sellPrice = ?, sellQuantity = ?, sellRemark = ?
      WHERE sellId = ?
    `;

    const sellmasterValues = [
      productId,
      customerId,
      sellDate,
      sellPrice,
      sellQuantity,
      sellRemark,
      id,
    ];

    db.query(updateSellmasterQuery, sellmasterValues, (err, sellResult) => {
      if (err) {
        console.error("Error updating sellmaster:", err);
        return res.status(500).json({
          success: false,
          message: "Error updating sellmaster record",
        });
      }

      if (sellResult.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Sell record not found",
        });
      }

      // Calculate new AMCDate as sellDate + 365 days
      const amcDateQuery = `DATE_ADD(?, INTERVAL 365 DAY)`;

      // Update AMCDate in AMCREcord based on the new sellDate
      const updateAmcRecordQuery = `
        UPDATE AMCREcord
        SET AMCDate = ${amcDateQuery}
        WHERE SellID = ?
      `;

      db.query(updateAmcRecordQuery, [sellDate, id], (amcErr, amcResult) => {
        if (amcErr) {
          console.error("Error updating AMCDate in AMCREcord:", amcErr);
          return res.status(500).json({
            success: false,
            message: "Error updating AMCDate in AMCREcord",
          });
        }

        res.status(200).json({
          success: true,
          message: "Sell and AMC records updated successfully",
        });
      });
    });
  },

  //   // Soft delete data
  deleteSell: (req, res) => {
    const sellId = req.params.id;

    // First query to update deleted_at in productmaster
    const deleteProductQuery = `
      UPDATE sellmaster
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE sellId = ? AND deleted_at IS NULL
    `;

    db.query(deleteProductQuery, [sellId], (productErr, productResult) => {
      if (productErr) {
        console.error("Error deleting product:", productErr);
        return res.status(500).json({
          success: false,
          message: "Error deleting sell",
        });
      }

      if (productResult.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Sell not found",
        });
      }

      // Second query to update deleted_at in AMCREcord table based on productId
      const deleteAmcRecordQuery = `
        UPDATE AMCREcord
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE sellId = ? AND deleted_at IS NULL
      `;

      db.query(deleteAmcRecordQuery, [sellId], (amcErr, amcResult) => {
        if (amcErr) {
          console.error("Error deleting AMC record:", amcErr);
          return res.status(500).json({
            success: false,
            message: "Error deleting AMC record",
          });
        }

        res.status(200).json({
          success: true,
          message: "Sell and associated AMC record deleted successfully",
        });
      });
    });
  },
};

module.exports = { sellAPI };
