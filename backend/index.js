// //packages
// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/userRoutes.js";
// import sportRoutes from "./routes/sportRoutes.js";
// import teamRoutes from "./routes/teamRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// //utils
// import connectDB from "./config/db.js";

// dotenv.config();
// const port = process.env.PORT || 3000;

// connectDB();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use("/api/users", userRoutes);
// app.use("/api/sport", sportRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/upload", uploadRoutes);

// const __dirname = path.resolve();

// app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// console.log(__dirname);
// // console.log(__filename);
// app.listen(port, () => console.log(`Server running on port: ${port}`));

import http from "http";
import app from "./app.js"; // Or "./app" if you rename to app.js
import { Server } from "socket.io";
import connectDB from "./config/db.js";

const port = process.env.PORT || 3000;

connectDB();

// const server = http.createServer(app);

// HTTP + WebSocket server
const server = http.createServer(app);

// ✅ Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // adjust this for production
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ✅ Middleware to expose io in request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
