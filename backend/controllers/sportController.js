import Sport from "../models/Sport.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createSport = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingSport = await Sport.findOne({ name });

    if (existingSport) {
      return res.json({ error: "Already exists" });
    }

    const sport = await new Sport({ name }).save();
    res.json(sport);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const listSport = asyncHandler(async (req, res) => {
  try {
    const all = await Sport.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const updateSport = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { sportId } = req.params;

    const sport = await Sport.findOne({ _id: sportId });

    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }

    sport.name = name;

    const updatedSport = await sport.save();
    res.json(updatedSport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeSport = asyncHandler(async (req, res) => {
  try {
    const removed = await Sport.findByIdAndDelete(req.params.sportId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const readSport = asyncHandler(async (req, res) => {
  try {
    const sport = await Sport.findOne({ _id: req.params.id });
    res.json(sport);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export { createSport, listSport, updateSport, readSport, removeSport };
