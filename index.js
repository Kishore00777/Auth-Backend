const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthRoutes = require("./Routes/AuthRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config(); // .env file
const port = process.env.port;
const app = express();
// app.use(express.json());   // middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", AuthRoutes); // importing routes

mongoose
  .connect(
    process.env.DB_CONNECTION_STRING
    //     {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     // useCreateIndex: true,
    //   }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`); // checking port
});
