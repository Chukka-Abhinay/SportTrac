//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import sportRoutes from "./routes/sportRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
//utils
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/sport", sportRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

console.log(__dirname);
// console.log(__filename);
app.listen(port, () => console.log(`Server running on port: ${port}`));
