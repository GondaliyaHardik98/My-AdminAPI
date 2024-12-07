const express = require("express");
const router = express.Router();
//import customerAPI from "../controllers/customerAPI";
const { challanAPI } = require("../controllers/challanAPI");

router.get("/challan", challanAPI.getAllChallan); // get
router.get("/challanCustomer", challanAPI.getCustomer); // get
router.get("/challanProduct", challanAPI.getProduct); // get
router.get("/challanEmployee", challanAPI.getEmployee); // get
router.get("/challan/:id", challanAPI.getChallanById); // get

router.post("/challan", challanAPI.createChallan); // create
router.put("/challan/:id", challanAPI.updateChallan); // get
router.delete("/challan/:id", challanAPI.deleteChallan); // get

module.exports = router;
