import { getSession } from "next-auth/client";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "POST") {
    let { id: savedPostId, isSaved: newState } = req.body;

    if (savedPostId == null || newState == null) {
      return res.status(404).send("Error");
    }

    if (newState == true) {
      let data = await User.findOneAndUpdate(
        { _id: session.id },
        { $push: { savedHelp: savedPostId } }
      );
      // console.log(data);
    } else {
      let data = await User.findOneAndUpdate(
        { _id: session.id },
        { $pull: { savedHelp: savedPostId } }
      );
      // console.log(data);
    }

    return res.status(200).send("success");
  } else {
    return res.status(404).send("Error");
  }
}
