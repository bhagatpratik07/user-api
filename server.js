require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.port || "3000";

mongoose.connect(process.env.URL);
const db = mongoose.connection;
db.once("open", () => console.log("connected to database"));
db.on("error", (err) => console.log(err));

app.use(express.json());

//routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.listen("3000", () => console.log(`listening to port ${PORT}`));
