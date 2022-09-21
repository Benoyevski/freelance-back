require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

app.use(cors());
app.use(express.json());

// вместо картинок будут файлы с тз
app.use(express.static(path.join(__dirname, "public")));
app.use("/public",express.static(path.resolve(__dirname, "public")));

// app.use(require('./routes/image.route'))

app.use(require('./routes/user.route'))
app.use(require('./routes/category.route'))
app.use(require("./routes/order.route"))

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("mongoose connect"))
  .catch(() => console.log("warning")); 

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server: ${process.env.SERVER_PORT} had been started`);
});