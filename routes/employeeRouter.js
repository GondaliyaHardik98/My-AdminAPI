const express = require("express");
const router = express.Router();
const multer = require("multer");
const { employeeAPI } = require("../controllers/employeeAPI");
const { checkRoles } = require("../middlewares/checkRoles.js");


router.get("/employees", checkRoles(["Super Admin", "Admin"]), employeeAPI.getAllEmployees);
router.post("/employees", checkRoles(["Super Admin", "Admin"]), employeeAPI.createEmployee);


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Adjust the path as needed
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/employees", employeeAPI.getAllEmployees);
router.post(
  "/employees",
  upload.fields([{ name: "photo", maxCount: 1 }, { name: "id_proof", maxCount: 1 }]),
  employeeAPI.createEmployee
);
router.put(
  "/employees/:id",
  upload.fields([{ name: "photo", maxCount: 1 }, { name: "id_proof", maxCount: 1 }]),
  employeeAPI.updateEmployee
);
router.delete("/employees/:id", employeeAPI.deleteEmployee);

module.exports = router;
