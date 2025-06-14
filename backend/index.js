//packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import User from "./models/User.js";
//filename
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";

//configuration
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 3000;

//routes
app.post("/register", (req, res) => {
  User.insertOne(req.body)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});
// const bcrypt = require("bcrypt");

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (String(password) === String(user.password)) {
          res.json("success");
        } else {
          res.json("Invalid Password");
        }
      } else {
        res.json("User doesn't exist");
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Login failed." });
    });
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT} `));
