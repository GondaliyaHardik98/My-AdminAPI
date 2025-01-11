const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();




// Middleware
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const authRouter = require("./routes/authRouter");
app.use("/api/auth", authRouter);

const employeeRoutes = require("./routes/employeeRouter");
app.use("/api", employeeRoutes);

const customerRoutes = require("./routes/customerRouter");
app.use("/api", customerRoutes);

const vendorRoutes = require("./routes/vendorRouter");
app.use("/api", vendorRoutes);

const productRouters = require("./routes/productRouter");
app.use("/api", productRouters);

const productMachineRouters = require("./routes/productMachineRouter");
app.use("/api", productMachineRouters);

const challanRouter = require("./routes/challanRouter");
app.use("/api", challanRouter);

const salaryRouter = require("./routes/salaryRouter");
app.use("/api", salaryRouter);

const sellRouter = require("./routes/sellRouter");
app.use("/api", sellRouter);

const amcRouter = require("./routes/amcRouter");
app.use("/api", amcRouter);

module.exports = app;
