import { getSession } from "next-auth/client";
import Help from "../../models/Help";
import User from "../../models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "POST") {
    let data = {
      ...req.body,
      isRequestHelp: true,
      isCompleted: false,
      creatorUid: session.id,
      matchedUid: "",
      completeDate: Date.now(),
    };

    // Update profile with new image
    let newHelp = await new Help(data);
    await newHelp.save();

    await User.findOneAndUpdate(
      { _id: session.id },
      { requestHelpId: newHelp._id }
    ).lean();

    return res.status(200).send("success");
  } else {
    return res.status(404).send("Error");
  }
}
