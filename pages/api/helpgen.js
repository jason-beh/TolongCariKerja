import { getSession } from "next-auth/client";
import Help from "../../models/Help";
import dbConnect from "../../utils/mongodb";
import { v4 as uuidv4 } from "uuid";
import Help from "../../models/Help";

export default async function handler(req, res) {
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).send("unauthenticated");
  // }
  if (req.method === "GET") {
    await dbConnect();
    let newHelp;

    try {
      newHelp = new Help({
        "skills" : [
          "cleaning"
        ],
        "message" : "test",
        "isRequestHelp" : false,
        "isCompleted" : "false",
        "creator" : "6108bf3f7def071e5fecc1a2",
        "matchedUid" : "",
        "completeDate" : "",
      });
      await newHelp.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(newHelp);
  } else {
    return res.status(404).send("Error");
  }
}
