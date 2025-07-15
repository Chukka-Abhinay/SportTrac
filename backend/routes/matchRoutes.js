// routes/matchRoutes.js
import express from "express";
import formidable from "express-formidable";
import {
  createMatch,
  getAllMatches,
  // updateScore,
  getMatchById,
  updateMatchById,
  deleteMatchById,
} from "../controllers/matchController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllMatches)
  .post(authenticate, authorizeAdmin, formidable(), createMatch);

// Update match score - only for authenticated admins
router
  .route("/:id")
  .get(getMatchById)
  .put(authenticate, authorizeAdmin, formidable(), updateMatchById)
  .delete(authenticate, authorizeAdmin, deleteMatchById);
// router.put("/:id/score", authenticate, authorizeAdmin, updateScore);

export default router;
