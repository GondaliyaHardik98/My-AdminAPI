const express = require("express");
const router = express.Router();

const { vendorAPI } = require("../controllers/VendorAPI");

router.get("/vendor", vendorAPI.getAllVendor);
router.post("/vendor", vendorAPI.createVendor);
router.put("/vendor/:id", vendorAPI.updateVendor);
router.delete("/vendor/:id", vendorAPI.deleteVendor);
module.exports = router;
