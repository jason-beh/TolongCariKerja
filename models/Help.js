import mongoose from "mongoose";
const { Schema } = mongoose;

const helpSchema = new Schema(
  {
    message: String,
    skills: [String],

    isRequestHelp: Boolean,
    isCompleted: Boolean,
    creatorUid: { type: Schema.Types.ObjectId, ref: "User" },
    matchedUid: { type: Schema.Types.ObjectId, ref: "User", default: null },
    completeDate: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models["Help"] || mongoose.model("Help", helpSchema, "help");
