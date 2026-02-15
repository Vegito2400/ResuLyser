const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const multer = require("multer");
const userRoutes= require("./routes/auth.routes");



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user",userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
