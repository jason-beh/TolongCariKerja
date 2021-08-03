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
      isRequestHelp: false,
      isCompleted: false,
      creatorUid: session.id,
      
      completeDate: "",
    };

    // Update profile with new image
    let newHelp = await new Help(data);
    await newHelp.save();

    await User.findOneAndUpdate({ _id: session.id }, { provideHelpId: newHelp._id }).lean();

    return res.status(200).send("success");
  } else if (req.method === "GET") {
    let { id } = req.query;

    if (typeof id === "undefined" || id === null) {
      return res.status(404).send("fail");
    }

    let data = await Help.findOne({ _id: id });

    if (typeof data === "undefined" || data === null) {
      return res.status(404).send("fail");
    }

    return res.status(200).send(data);
  } else if (req.method === "PUT") {
    await Help.findOneAndUpdate({ _id: session.dbUser.provideHelpId }, req.body).lean();

    return res.status(200).send("success");
  } else if (req.method === "DELETE") {
    await Help.findOneAndDelete({ _id: session.dbUser.provideHelpId }, req.body).lean();

    await User.findOneAndUpdate({ _id: session.id }, { provideHelpId: "" }).lean();
    
    return res.status(200).send("success");
  } else {
    return res.status(404).send("Error");
  }
}
