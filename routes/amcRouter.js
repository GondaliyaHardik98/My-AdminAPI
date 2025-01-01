const express = require("express");
const router = express.Router();
const { amcAPI } = require("../controllers/amcAPI");

// Routes
router.get("/amc", amcAPI.getAllAMCRecords);
router.put("/amc", amcAPI.updateAMCRecord);

module.exports = router;
