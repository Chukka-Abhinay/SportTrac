import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://sport-trac-1st15sq0p-chukka-abhinays-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ✅ Attach io globally to the app
app.set("io", io);

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("✅ New socket client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
