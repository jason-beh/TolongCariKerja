import axios from "axios";
import { getSession } from "next-auth/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("unauthenticated");
  }

  if (req.method === "POST") {
    let { language, text } = req.body;

    let { data } = await axios({
      url: "https://api.cognitive.microsofttranslator.com/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_TRANSLATE_KEY,
        "Ocp-Apim-Subscription-Region": process.env.AZURE_TRANSLATE_REGION,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: language,
        to: "en",
      },
      data: [
        {
          text,
        },
      ],
      responseType: "json",
    });

    return res.send(data);
  } else {
    return res.status(404).send("Error");
  }
}
