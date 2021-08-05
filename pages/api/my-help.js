import { getSession } from "next-auth/client";
import Help from "../../models/Help";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "POST") {
    console.log(req.body);

    let { creator } = req.body;

    if (creator == null) {
      return res.status(403).send("Forbidden");
    }

    let helpData = await Help.find({
      isCompleted: false,
      creator,
    })
      .populate("creator")
      .lean();

    console.log(helpData);

    return res.send(helpData);
  } else {
    return res.status(404).send("Error");
  }
}
