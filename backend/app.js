import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import formidableMiddleware from "express-formidable";

import userRoutes from "./routes/userRoutes.js";
import sportRoutes from "./routes/sportRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import uploadVideoRoutes from "./routes/uploadVideoRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();

app.use(express.json()); // to parse application/json
app.use(express.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded

// ✅ Parse form data before routes
// app.use(formidableMiddleware());

// ✅ Middlewares
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

// ✅ Inject io instance into every request (CRITICAL)
app.use((req, res, next) => {
  req.io = app.get("io");  // <--- This line makes real-time updates work
  next();
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/sport", sportRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/upload/videos", uploadVideoRoutes);
app.use("/api/matches", matchRoutes);

// ✅ Serve static files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads/videos", express.static(path.join(__dirname, "/uploads/videos")));

export default app;
