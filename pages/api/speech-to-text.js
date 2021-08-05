import axios from "axios";

export default async function handler(req, res) {
  //   const session = await getSession({ req });

  //   if (!session) {
  //     return res.status(401).send("unauthenticated");
  //   }

  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    const speechKey = process.env.AZURE_STT_KEY;
    const speechRegion = process.env.AZURE_STT_REGION;

    if (
      speechKey === "paste-your-speech-key-here" ||
      speechRegion === "paste-your-speech-region-here"
    ) {
      res.status(400).send("You forgot to add your speech key or region to the .env file.");
    } else {
      const headers = {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.AZURE_STT_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      try {
        const tokenResponse = await axios.post(
          `https://southeastasia.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
          null,
          headers
        );

        res.send({ token: tokenResponse.data, region: speechRegion });
      } catch (err) {
        console.log(err);
        res.status(401).send("There was an error authorizing your speech key.");
      }
    }
  } else {
    return res.status(404).send("Error");
  }
}
