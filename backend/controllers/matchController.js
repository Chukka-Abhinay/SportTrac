// controllers/matchController.js
import asyncHandler from "../middlewares/asyncHandler.js";
import Match from "../models/Match.js";

// ✅ Create a new match
const createMatch = asyncHandler(async (req, res) => {
  try {
    const { teamA, teamB, sport, location, scheduledTime } = req.fields;
    switch (true) {
      case !teamA || !teamB || teamA === "undefined" || teamB === "undefined":
        return res.json({ error: "Team is required or invalid" });
      case !sport || sport === "undefined" || sport.length !== 24:
        return res.json({ error: "Sport is required or invalid" });
      case !location:
        return res.json({ error: "Location is required" });
      case !scheduledTime:
        return res.json({ error: "Scheduled Time is required" });
    }

    const match = new Match({ ...req.fields });
    await match.save();
    res.json(match);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
const getAllMatches = asyncHandler(async (req, res) => {
  try {
    const matches = await Match.find()
    .populate("sport", "name")
    .populate("teamA", "name logo")
    .populate("teamB", "name logo")
    .sort({ scheduledTime: 1 });


    // Include virtual status manually in response
    const matchesWithStatus = matches.map((match) => ({
      ...match.toObject(),
      calculatedStatus: match.calculatedStatus,
    }));

    res.json(matchesWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const getMatchById = asyncHandler(async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match) {
      const matchWithStatus = {
        ...match.toObject(),
        calculatedStatus: match.calculatedStatus,
      };
      return res.json(matchWithStatus);
    } else {
      res.status(404);
      throw new Error("Match not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Team not found" });
  }
});

const updateMatchById = asyncHandler(async (req, res) => {
  try {
    const { teamA, teamB, sport, location, scheduledTime } = req.fields;
    switch (true) {
      case !teamA || !teamB || teamA === "undefined" || teamB === "undefined":
        return res.json({ error: "Team is required or invalid" });
      case !sport || sport === "undefined" || sport.length !== 24:
        return res.json({ error: "Sport is required or invalid" });
      case !location:
        return res.json({ error: "Location is required" });
      case !scheduledTime:
        return res.json({ error: "Scheduled Time is required" });
    }
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await match.save();
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
const deleteMatchById = asyncHandler(async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatchById,
  deleteMatchById,
};
