import { getSession } from "next-auth/client";
import User from "../../../models/User";
const cloudinary = require("cloudinary").v2;

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send("Forbidden");
  }
  if (req.method === "POST") {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let { previousImage, newImage } = req.body;

    // Extract public id from previousImage url
    previousImage = previousImage.split("/");
    let lastIndex = previousImage.length - 1;
    let secondLastIndex = previousImage.length - 2;
    previousImage[lastIndex] = previousImage[lastIndex].split(".")[0];
    let previousPublicId = previousImage[secondLastIndex] + "/" + previousImage[lastIndex];
    // console.log(previousPublicId);

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(previousPublicId, function (result) {
      console.log(result);
    });

    // Update profile with new image
    let data = await User.findOneAndUpdate(
      { _id: session.id },
      {
        image: newImage,
      }
    ).lean();

    return res.send(data);
  } else {
    return res.status(404).send("Error");
  }
}
