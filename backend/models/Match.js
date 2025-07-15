// models/Match.js
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const matchSchema = new mongoose.Schema(
  {
    teamA: { type: ObjectId, ref: "Team", required: true },
    teamB: { type: ObjectId, ref: "Team", required: true },
    sport: { type: ObjectId, ref: "Sport", required: true },
    location: { type: String, required: true },
    scheduledTime: { type: Date, required: true },

    // 🕒 Duration of match in minutes (default: 120 = 2 hours)
    duration: { type: Number, default: 120 },

    score: {
      teamA: { type: Number, default: 0 },
      teamB: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🧠 Virtual field for calculatedStatus
matchSchema.virtual("calculatedStatus").get(function () {
  const now = new Date();
  const matchStart = this.scheduledTime;
  const matchEnd = new Date(matchStart.getTime() + this.duration * 60 * 1000); // use dynamic duration

  if (now < matchStart) {
    return "upcoming";
  } else if (now >= matchStart && now <= matchEnd) {
    return "live";
  } else {
    return "completed";
  }
});

const Match = mongoose.model("Match", matchSchema);
export default Match;
