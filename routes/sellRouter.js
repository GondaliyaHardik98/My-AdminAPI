const express = require("express");
const router = express.Router();
const { sellAPI } = require("../controllers/sellAPI");

// Routes
router.get("/sell", sellAPI.getAllSellData);
router.get("/amcdata", sellAPI.getAMCData);
router.post("/sell", sellAPI.createSell);
router.put("/sell/:id", sellAPI.updateSell);
router.delete("/sell/:id", sellAPI.deleteSell);

module.exports = router;
