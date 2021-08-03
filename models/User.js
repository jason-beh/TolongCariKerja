import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    name: String,

    contact: { type: Number, default: null },
    skills: { type: [String], default: [] },
    completedJobs: { type: [String], default: [] },
    location: { type: String, default: "" },
    requestHelpId: { type: Schema.Types.ObjectId, ref: "Help", default: null },
    provideHelpId: { type: Schema.Types.ObjectId, ref: "Help", default: null },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models["User"] || mongoose.model("User", userSchema, "users");
