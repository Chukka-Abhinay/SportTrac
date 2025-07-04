// models/Team.js
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

// 1) Player sub‐schema, now with avatar
const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
    },
    nationality: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: "/images/default_avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

// 2) Team schema (unchanged)
const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, trim: true },
    //   homeStadium: { type: String, trim: true },
    //   foundedYear: { type: Number },
    sport: { type: ObjectId, ref: "Sport", required: true },
    players: [playerSchema],
    numPlayers: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Keep numPlayers in sync
teamSchema.pre("save", function (next) {
  this.numPlayers = this.players.length;
  next();
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
