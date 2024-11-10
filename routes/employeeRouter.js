const express = require("express");
const router = express.Router();
const { employeeAPI, uploadFields } = require("../controllers/employeeAPI");

// Routes
router.get("/employees", employeeAPI.getAllEmployees);
router.get("/employees/:id", employeeAPI.getEmployeeById);
router.post("/employees", uploadFields, employeeAPI.createEmployee);
router.put("/employees/:id", uploadFields, employeeAPI.updateEmployee);
router.delete("/employees/:id", employeeAPI.deleteEmployee);

module.exports = router;
