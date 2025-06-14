// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashed });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     res.status(500).json({ error: "User registration failed." });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "User not found." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid credentials." });

//     res.status(200).json({ message: "Login successful." });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed." });
//   }
// });

// export default router;
