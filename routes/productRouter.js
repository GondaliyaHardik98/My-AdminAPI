const express = require("express");
const router = express.Router();
const { productAPI } = require("../controllers/productAPI");

// Routes
router.get("/product", productAPI.getVendorCombo);
router.get("/productAll", productAPI.getAllProductData);
router.post("/product", productAPI.createProduct);
router.put("/product/:id", productAPI.updateProduct);
router.delete("/product/:id", productAPI.deleteProduct);

module.exports = router;
