const db = require("../config/db");

const sellAPI = {
  // Fetch all sell records
  getAllSellRecords: (req, res) => {
    const query = `
      SELECT sm.sellId, sm.customerId, ct.name AS customerName, sm.productId, pm.productName,
             sm.sellDate, sm.price, IFNULL(SUM(i.amountPaid), 0) AS totalPaid,
             (sm.price - IFNULL(SUM(i.amountPaid), 0)) AS balance, sm.remark
      FROM sellmaster sm
      LEFT JOIN customer_table ct ON sm.customerId = ct.customerId
      LEFT JOIN productmaster pm ON sm.productId = pm.productId
      LEFT JOIN installments i ON sm.sellId = i.sellId
      WHERE sm.deleted_at IS NULL
      GROUP BY sm.sellId;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching sell records:", err);
        return res.status(500).json({ success: false, message: "Error fetching sell records." });
      }

      res.status(200).json({ success: true, data: results || [] });
    });
  },

  // Add a new sell record
  createSell: (req, res) => {
    const { customerId, productId, sellDate, price, remark } = req.body;

    if (!customerId || !productId || !sellDate || !price) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const query = `
      INSERT INTO sellmaster (customerId, productId, sellDate, price, remark)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [customerId, productId, sellDate, price, remark || null];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating sell record:", err);
        return res.status(500).json({ success: false, message: "Error creating sell record." });
      }

      const sellId = result.insertId;

      // Create AMC record automatically
      const amcQuery = `
        INSERT INTO amc_record (sellId, customerId, productId, sellDate, maintenanceStartDate)
        VALUES (?, ?, ?, ?, DATE_ADD(?, INTERVAL 1 YEAR))
      `;
      const amcValues = [sellId, customerId, productId, sellDate, sellDate];

      db.query(amcQuery, amcValues, (err) => {
        if (err) {
          console.error("Error creating AMC record:", err);
          return res.status(500).json({ success: false, message: "Error creating AMC record." });
        }

        res.status(201).json({ success: true, message: "Sell record and AMC created successfully." });
      });
    });
  },

  // Add installment
  addInstallment: (req, res) => {
    const { sellId, amountPaid, paymentDate, remark } = req.body;

    if (!sellId || !amountPaid || !paymentDate) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const query = `
      INSERT INTO installments (sellId, amountPaid, paymentDate, remark)
      VALUES (?, ?, ?, ?)
    `;
    const values = [sellId, amountPaid, paymentDate, remark || null];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Error adding installment:", err);
        return res.status(500).json({ success: false, message: "Error adding installment." });
      }

      res.status(201).json({ success: true, message: "Installment added successfully." });
    });
  },

  // Fetch installment history for a sell record
  getInstallmentHistory: (req, res) => {
    const sellId = req.params.sellId;

    if (!sellId) {
      return res.status(400).json({ success: false, message: "Sell ID is required." });
    }

    const query = `
      SELECT installmentId, sellId, amountPaid, paymentDate, remark
      FROM installments
      WHERE sellId = ?
      ORDER BY paymentDate ASC;
    `;

    db.query(query, [sellId], (err, results) => {
      if (err) {
        console.error("Error fetching installment history:", err);
        return res.status(500).json({ success: false, message: "Error fetching installment history." });
      }

      res.status(200).json({ success: true, data: results || [] });
    });
  },
};

module.exports = { sellAPI };
