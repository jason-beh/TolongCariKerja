import { getSession } from "next-auth/client";
import User from "../../../models/User";
const cloudinary = require("cloudinary").v2;

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "POST") {

    // Update profile with new image
    let data = await User.findOneAndUpdate(
      { _id: session.id },
      req.body
    ).lean();

    return res.status(200).send("success");
  } else {
    return res.status(404).send("Error");
  }
}
