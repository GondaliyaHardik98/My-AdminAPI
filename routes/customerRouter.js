const express = require("express");
const router = express.Router();
//import customerAPI from "../controllers/customerAPI";
const { customerAPI } = require("../controllers/customerAPI");

router.post("/customer", customerAPI.createCustomer); // create
router.get("/customer", customerAPI.getAllCustomers); // get
router.get("/customer/:id", customerAPI.getCustomerById);
router.put("/customer/:id", customerAPI.updateCustomer); // get
router.delete("/customer/:id", customerAPI.deleteEmployee); // get
module.exports = router;
