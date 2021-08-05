import { getSession } from "next-auth/client";
import Help from "../../../models/Help";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "GET") {
    const { id } = req.query;

    let helpData = await Help.findById(id).populate("creator").lean();

    return res.status(200).send(helpData);
  } else {
    return res.status(404).send("Error");
  }
}
