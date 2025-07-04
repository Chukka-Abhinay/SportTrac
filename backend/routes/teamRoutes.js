import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { checkObjectId } from "../middlewares/checkObjectId.js";
import {
  addTeam,
  fetchTeams,
  fetchAllTeams,
  fetchTeamById,
  updateTeamDetails,
  removeTeam,
  addTeamPlayer,
  updateTeamPlayer,
  getTeamPlayer,
  removePlayer,
} from "../controllers/teamController.js";

router
  .route("/")
  .get(fetchTeams)
  .post(authenticate, authorizeAdmin, formidable(), addTeam);

router.route("/allteams").get(fetchAllTeams);
router.route("/:id/players").post(authenticate, authorizeAdmin, addTeamPlayer);
router
  .route("/:id/players/:playerId")
  .get(checkObjectId("id"), checkObjectId("playerId"), getTeamPlayer)
  .put(
    authenticate,
    authorizeAdmin,
    checkObjectId("id"),
    checkObjectId("playerId"),
    updateTeamPlayer
  )
  .delete(
    authenticate,
    authorizeAdmin,
    checkObjectId("id"),
    checkObjectId("playerId"),
    removePlayer
  );
router
  .route("/:id")
  .get(fetchTeamById)
  .put(authenticate, authorizeAdmin, formidable(), updateTeamDetails)
  .delete(authenticate, authorizeAdmin, removeTeam);
export default router;
