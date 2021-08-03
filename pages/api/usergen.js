import { getSession } from "next-auth/client";
import User from "../../models/User";
import dbConnect from "../../utils/mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).send("unauthenticated");
  // }
  if (req.method === "GET") {
    await dbConnect();
    let newUser;

    try {
      newUser = new User({
        uid: uuidv4(),
        email: "b@gmail.com",
        name: "Timmy",
        contact: "00923012",
        skills: ["firebase"],
        completedJobs: [],
        location: "Selangor",
        requestHelpId: "",
        provideHelpId: "",
        image: "test image here",
      });
      await newUser.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(newUser);
  } else {
    return res.status(404).send("Error");
  }
}
