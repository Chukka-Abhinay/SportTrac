import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
  video: { type: String, trim: true },
});

export default mongoose.model("Sport", sportSchema);
