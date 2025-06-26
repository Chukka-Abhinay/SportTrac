import express from "express";
const router = express.Router();
import {
  createSport,
  listSport,
  updateSport,
  removeSport,
  readSport,
} from "../controllers/sportController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createSport);

router.route("/sports").get(listSport);
router.route("/:sportId").put(authenticate, authorizeAdmin, updateSport);
router.route("/:sportId").delete(authenticate, authorizeAdmin, removeSport);
router.route("/:id").get(readSport);

export default router;
