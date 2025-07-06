import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/userRoutes.js";
import sportRoutes from "./routes/sportRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/sport", sportRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/matches", matchRoutes);
// Serve uploads folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

export default app;
