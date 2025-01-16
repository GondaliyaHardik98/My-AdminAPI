const db = require("../config/db");

const amcAPI = {
  // Fetch all AMC records
  getAllAMCRecords: (req, res) => {
    const query = `
      SELECT ar.amcId, ar.sellId, ar.customerId, ct.name AS customerName,
             ar.productId, pm.productName, ar.sellDate, ar.maintenanceStartDate,
             ar.maintenanceEndDate, ar.updated_at, ar.amcProductName, ar.amcPrice
      FROM amc_record ar
      LEFT JOIN customer_table ct ON ar.customerId = ct.customerId
      LEFT JOIN productmaster pm ON ar.productId = pm.productId
      WHERE ar.maintenanceEndDate IS NULL OR ar.maintenanceEndDate > CURRENT_DATE;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching AMC records:", err);
        return res.status(500).json({ success: false, message: "Error fetching AMC records." });
      }

      res.status(200).json({ success: true, data: results || [] });
    });
  },

  createAMCRecord: (req, res) => {
    const {
      sellId,
      amcProductName,
      maintenanceStartDate,
      maintenanceEndDate,
      amcPrice,
    } = req.body;

    if (!sellId || !amcProductName || !maintenanceStartDate || !maintenanceEndDate || amcPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "Sell ID, AMC Product Name, Start Date, End Date, and Price are required.",
      });
    }

    const fetchSellQuery = `
      SELECT customerId, productId, sellDate
      FROM sellmaster
      WHERE sellId = ?;
    `;

    db.query(fetchSellQuery, [sellId], (err, result) => {
      if (err) {
        console.error("Error fetching Sell record:", err);
        return res.status(500).json({ success: false, message: "Error fetching Sell record." });
      }

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: "Sell record not found." });
      }

      const { customerId, productId, sellDate } = result[0];
      const createAMCQuery = `
        INSERT INTO amc_record (
          sellId, customerId, productId, sellDate, amcProductName,
          maintenanceStartDate, maintenanceEndDate, amcPrice
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        sellId,
        customerId,
        productId,
        sellDate,
        amcProductName,
        maintenanceStartDate,
        maintenanceEndDate,
        amcPrice,
      ];

      db.query(createAMCQuery, values, (err) => {
        if (err) {
          console.error("Error inserting AMC record:", err);
          return res.status(500).json({ success: false, message: "Error creating AMC record." });
        }

        res.status(201).json({ success: true, message: "AMC record created successfully." });
      });
    });
  },

  // Update AMC Record
  updateAMCRecord: (req, res) => {
    const {
      amcId,
      maintenanceStartDate,
      maintenanceEndDate,
      amcPrice,
      amcProductName,
    } = req.body;

    if (!amcId || !maintenanceStartDate || !maintenanceEndDate || amcPrice === undefined || !amcProductName) {
      return res.status(400).json({
        success: false,
        message: "AMC ID, Start Date, End Date, Price, and Product Name are required.",
      });
    }

    const updateQuery = `
      UPDATE amc_record
      SET maintenanceStartDate = ?, maintenanceEndDate = ?, amcPrice = ?, amcProductName = ?, updated_at = NOW()
      WHERE amcId = ?;
    `;

    const values = [maintenanceStartDate, maintenanceEndDate, amcPrice, amcProductName, amcId];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating AMC record:", err);
        return res.status(500).json({ success: false, message: "Error updating AMC record." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "AMC record not found." });
      }

      res.status(200).json({ success: true, message: "AMC record updated successfully." });
    });
  },

  // Automatically Create Free AMC for New Sell
  createAMCForNewSell: (sellId, callback) => {
    const fetchSellQuery = `
      SELECT customerId, productId, sellDate
      FROM sellmaster
      WHERE sellId = ?;
    `;
  
    db.query(fetchSellQuery, [sellId], (err, result) => {
      if (err) {
        console.error("Error fetching Sell record:", err);
        return callback(err, null);
      }
  
      if (result.length === 0) {
        return callback(new Error("Sell record not found."), null);
      }
  
      const { customerId, productId, sellDate } = result[0];
  
      // Calculate maintenance start and end dates
      const maintenanceStartDate = sellDate;
      const maintenanceEndDate = new Date(sellDate);
      maintenanceEndDate.setFullYear(maintenanceEndDate.getFullYear() + 1);
  
      const createAMCQuery = `
        INSERT INTO amc_record (
          sellId, customerId, productId, sellDate, amcProductName,
          maintenanceStartDate, maintenanceEndDate, amcPrice
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        sellId,
        customerId,
        productId,
        sellDate,
        "Free AMC",
        maintenanceStartDate,
        maintenanceEndDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
        0, // Free AMC Price
      ];
  
      db.query(createAMCQuery, values, (err, result) => {
        if (err) {
          console.error("Error creating free AMC record:", err);
          return callback(err, null);
        }
  
        callback(null, result);
      });
    });
  },
  
  
  
};

module.exports = { amcAPI };
