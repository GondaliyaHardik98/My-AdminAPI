const express = require("express");
const router = express.Router();
const { salaryAPI } = require("../controllers/salaryAPI");

// Routes
router.get("/salary", salaryAPI.getAllSalary);
router.post("/salary", salaryAPI.createSalary);
router.put("/salary/:id", salaryAPI.updateSalary);
router.delete("/salary/:id", salaryAPI.deleteSalary);

module.exports = router;
