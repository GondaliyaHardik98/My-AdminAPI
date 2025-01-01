const express = require("express");
const router = express.Router();
//import customerAPI from "../controllers/customerAPI";
const { challanAPI } = require("../controllers/challanAPI");


router.get("/customer", challanAPI.getCustomer);
router.get("/product", challanAPI.getProduct);
router.get("/employee", challanAPI.getEmployee);
router.get("/challan", challanAPI.getAllChallan);
router.get("/challan/:id", challanAPI.getChallanById);
router.post("/challan", challanAPI.createChallan);
router.put("/challan/:id", challanAPI.updateChallan); // Ensure updateChallan exists and is imported
router.delete("/challan/:id", challanAPI.deleteChallan);

module.exports = router;
