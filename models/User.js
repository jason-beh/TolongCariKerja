import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uid: String,
    email: String,
    name: String,
    contact: Number,
    skills: [String],
    completedJobs: [String],
    location: String,
    requestHelpId: String,
    provideHelpId: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models["User"] || mongoose.model("User", userSchema, "users");
