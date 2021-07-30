import { getSession } from "next-auth/client";
import User from "../../models/User";
import dbConnect from "../../utils/mongodb";

export default async function handler(req, res) {
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).send("unauthenticated");
  // }
  if (req.method === "GET") {
    await dbConnect();

    try {
      let newUser = new User({
        name: "Jason",
        email: "test.com",
        image: "sadasld",
      });
      await newUser.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json({ name: "John Doe" });
  } else {
    return res.status(404).send("Error");
  }
}
