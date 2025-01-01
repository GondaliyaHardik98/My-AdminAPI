const express = require("express");
const router = express.Router();
const { sellAPI } = require("../controllers/sellAPI");

// Route to fetch all sell records
router.get("/sell", sellAPI.getAllSellRecords);

// Route to create a new sell record
router.post("/sell", sellAPI.createSell);

// Route to add a new installment
router.post("/sell/installment", sellAPI.addInstallment);

// Route to fetch installment history for a specific sell record
router.get("/sell/installments/:sellId", sellAPI.getInstallmentHistory);

module.exports = router;
