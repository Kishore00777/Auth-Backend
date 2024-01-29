const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config();

const AuthRoutes = require("./Routes/AuthRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config(); // .env file
const port = 8888;
const url =
  "mongodb+srv://kishoremurgan0077:bO2EyEAZtlxK5JnX@cluster0.29k33hr.mongodb.net/?retryWrites=true&w=majority";
const app = express();
// app.use(express.json());   // middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", AuthRoutes); // importing routes

mongoose.connect(process.env.MONGODB_URI)

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`); // checking port
});
