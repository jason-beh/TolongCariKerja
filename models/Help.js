import mongoose from "mongoose";
const { Schema } = mongoose;

const helpSchema = new Schema(
  {
    message: String,
    skills: [String],

    isRequestHelp: Boolean,
    isCompleted: String,
    creatorUid: String,
    matchedUid: String,
    completeDate: String,
  },
  { timestamps: true }
);

export default mongoose.models["Help"] ||
  mongoose.model("Help", helpSchema, "help");
