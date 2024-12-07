const express = require("express");
const router = express.Router();
const { productMachineAPI } = require("../controllers/productMachineAPI");

// Routes
router.get("/productMachine", productMachineAPI.getVendorCombo);
router.get("/productMachineAll", productMachineAPI.getAllProductMachineData);
router.post("/productMachine", productMachineAPI.createProductMachine);
router.put("/productMachine/:id", productMachineAPI.updateProductMachine);
router.delete("/productMachine/:id", productMachineAPI.deleteProductMachine);

module.exports = router;
