// index.js
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import app from "./app.js"; // your Express app
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads directories exist (on mounted disk)
const baseUploadPath = "/opt/render/project/uploads";
fs.mkdirSync(`${baseUploadPath}/images`, { recursive: true });
fs.mkdirSync(`${baseUploadPath}/videos`, { recursive: true });

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(baseUploadPath));

// ✅ Setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ New socket client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
