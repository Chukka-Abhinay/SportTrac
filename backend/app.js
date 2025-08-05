// backend/app.js (Revised)
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import formidableMiddleware from "express-formidable";

import userRoutes from "./routes/userRoutes.js";
import sportRoutes from "./routes/sportRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import uploadImageRoutes from "./routes/uploadImageRoutes.js";
import uploadVideoRoutes from "./routes/uploadVideoRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(formidableMiddleware()); // Keep commented out

app.use(cookieParser());
// ✅ For production, change `origin: "*"` to your Vercel frontend URL
app.use(cors({ origin: "https://sport-trac-pg7uu1w3j-chukka-abhinays-projects.vercel.app", credentials: true })); 

app.use((req, res, next) => {
  req.io = app.get("io");
  next();
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/sport", sportRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/upload/images", uploadImageRoutes);
app.use("/api/upload/videos", uploadVideoRoutes);
app.use("/api/matches", matchRoutes);

// ✅ CRITICAL: REMOVE THE express.static LINES
// The files are now served from Cloudinary via URL, not your server's disk.
// const __dirname = path.resolve();
// app.use("/uploads/images", express.static(path.join(__dirname, "/uploads/images")));
// app.use("/uploads/videos", express.static(path.join(__dirname, "/uploads/videos")));

export default app;