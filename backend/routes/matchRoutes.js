import express from "express";
import {
  updateMatchById,
  createMatch,
  deleteMatchById,
  getAllMatches,
  getMatchById,
} from "../controllers/matchController.js";
import formidableMiddleware from "express-formidable";
// import { io } from "../index.js"; // import io here

const router = express.Router();

router.put("/:id", formidableMiddleware(), updateMatchById);

// other routes
router.get("/", getAllMatches);
router.post("/", formidableMiddleware(), createMatch);
router.get("/:id", getMatchById);
router.delete("/:id", deleteMatchById);

export default router;
