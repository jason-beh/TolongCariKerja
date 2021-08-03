import { getSession } from "next-auth/client";
import Help from "../../../models/Help";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "GET") {
    
    

  } else {
    return res.status(404).send("Error");
  }
}
