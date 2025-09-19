require("dotenv").config({
    path: "../config.env",
});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoutes = require("./routes/payment");

const app = express();

// ✅ Cấu hình CORS
app.use(
    cors({
        origin: "*",
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/payment", paymentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Danal Payment Example running on http://localhost:${PORT}`);
});
