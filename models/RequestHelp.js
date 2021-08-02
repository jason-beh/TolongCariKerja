import mongoose from "mongoose";
const { Schema } = mongoose;

const requestHelpSchema = new Schema(
  {
    message: String,
    skills: [String],
    location: String,

    isCompleted: String,
    creatorUid: String,
    matchedUid: String,
    completeDate: String,
  },
  { timestamps: true }
);

export default mongoose.models["RequestHelp"] ||
  mongoose.model("RequestHelp", requestHelpSchema, "requestHelps");
