// backend/routes/matchRoutes.js (Corrected)
import express from "express";
import {
  updateMatchById,
  createMatch,
  deleteMatchById,
  getAllMatches,
  getMatchById,
} from "../controllers/matchController.js";
import formidableMiddleware from "express-formidable";

const router = express.Router();

// ✅ Apply formidable middleware to both POST and PUT routes
router.post("/", formidableMiddleware(), createMatch);
router.put("/:id", formidableMiddleware(), updateMatchById);

// other routes (no change needed here)
router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.delete("/:id", deleteMatchById);

export default router;