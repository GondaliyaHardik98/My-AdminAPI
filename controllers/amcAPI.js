const db = require("../config/db");

const amcAPI = {
  // Fetch all AMC records
  getAllAMCRecords: (req, res) => {
    const query = `
      SELECT ar.amcId, ar.sellId, ar.customerId, ct.name AS customerName,
             ar.productId, pm.productName, ar.sellDate, ar.maintenanceStartDate,
             ar.maintenanceEndDate, ar.updated_at
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

  // Update AMC Record (Edit Maintenance Start and End Date)
  updateAMCRecord: (req, res) => {
    const { amcId, maintenanceStartDate, maintenanceEndDate } = req.body;

    if (!amcId || !maintenanceStartDate) {
      return res.status(400).json({ success: false, message: "AMC ID and Maintenance Start Date are required." });
    }

    const query = `
      UPDATE amc_record
      SET maintenanceStartDate = ?, maintenanceEndDate = ?, updated_at = CURRENT_TIMESTAMP
      WHERE amcId = ?;
    `;

    db.query(query, [maintenanceStartDate, maintenanceEndDate || null, amcId], (err) => {
      if (err) {
        console.error("Error updating AMC record:", err);
        return res.status(500).json({ success: false, message: "Error updating AMC record." });
      }

      res.status(200).json({ success: true, message: "AMC record updated successfully." });
    });
  },
};

module.exports = { amcAPI };
