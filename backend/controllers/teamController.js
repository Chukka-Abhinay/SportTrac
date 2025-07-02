import asyncHandler from "../middlewares/asyncHandler.js";
import Team from "../models/Team.js";

const addTeam = asyncHandler(async (req, res) => {
  try {
    const { name, sport } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !sport || sport === "undefined" || sport.length !== 24:
        return res.json({ error: "Sport is required or invalid" });
    }
    const team = new Team({ ...req.fields });
    await team.save();
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTeams = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Team.countDocuments({ ...keyword });
    const teams = await Team.find({ ...keyword }).limit(pageSize);

    res.json({
      teams,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchAllTeams = asyncHandler(async (req, res) => {
  try {
    const teams = await Team.find({})
      .populate("sport")
      .limit(12)
      .sort({ createAt: -1 });
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchTeamById = asyncHandler(async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      return res.json(team);
    } else {
      res.status(404);
      throw new Error("Team not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Team not found" });
  }
});

const updateTeamDetails = asyncHandler(async (req, res) => {
  try {
    const { name, sport } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !sport || sport === undefined || sport.length !== 24:
        return res.json({ error: "Sport is required or invalid" });
    }
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await team.save();
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeTeam = asyncHandler(async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const addTeamPlayer = asyncHandler(async (req, res) => {
  try {
    // 1) pull everything out of req.body
    const { name, position, number, age, nationality, avatar } = req.body;

    // 2) find the team
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // 3) validate required fields
    switch (true) {
      case !name:
        return res.status(400).json({ error: "Player name is required" });
      case !position:
        return res.status(400).json({ error: "Player position is required" });
      case number == null:
        return res.status(400).json({ error: "Player number is required" });
    }

    // 4) build the sub‐doc object
    const newPlayer = { name, position, number };
    if (age != null) newPlayer.age = age;
    if (nationality?.trim()) newPlayer.nationality = nationality.trim();
    if (avatar?.trim()) newPlayer.avatar = avatar.trim();
    // avatar will fall back to your schema default if undefined

    // 5) push & save (pre‐save hook will bump numPlayers)
    team.players.push(newPlayer);
    await team.save();

    // 6) grab the one we just added
    const added = team.players[team.players.length - 1];

    // 7) return it
    return res.status(201).json({ message: "Player added", player: added });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
});

const updateTeamPlayer = asyncHandler(async (req, res) => {
  try {
    const { name, position, number, age, nationality, avatar } = req.body;

    // 1) fetch team
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // 2) find the player sub-doc
    const player = team.players.id(req.params.playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    // 3) apply any updates (only overwrite if the field was sent)
    if (name != null) player.name = name;
    if (position != null) player.position = position;
    if (number != null) player.number = number;
    if (age != null) player.age = age;
    if (nationality != null) player.nationality = nationality;
    if (avatar != null) player.avatar = avatar;

    // 4) save the parent doc (pre‐save will bump numPlayers if needed)
    await team.save();

    // 5) return the updated player
    res.json({ message: "Player updated", player });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

const getTeamPlayer = asyncHandler(async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const player = team.players.id(req.params.playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

const removePlayer = asyncHandler(async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const player = team.players.id(req.params.playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    team.players.pull({ _id: req.params.playerId });
    await team.save();
    res.status(200).json({ message: "Player removed successfully", player });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export {
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
};
