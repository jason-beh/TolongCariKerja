import mongoose from "mongoose";
const { Schema } = mongoose;

const provideHelpSchema = new Schema(
  {
    message: String,
    skills: [String],

    isCompleted: String,
    creatorUid: String,
    matchedUid: String,
    completeDate: String,
  },
  { timestamps: true }
);

export default mongoose.models["ProvideHelp"] ||
  mongoose.model("ProvideHelp", provideHelpSchema, "provideHelps");
