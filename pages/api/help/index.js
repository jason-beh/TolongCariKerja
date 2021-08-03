import { getSession } from "next-auth/client";
import Help from "../../../models/Help";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "GET") {
    // Update profile with new image
    let helpData = await Help.find({
      isCompleted: false,
    })
      .populate("creatorUid")
      .lean();

    console.log(helpData);

    return res.send(helpData);
  } else {
    return res.status(404).send("Error");
  }
}
