import { useEffect, useState } from "react";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import { getTokenOrRefresh } from "../utils/tokenUtil";
import axios from "axios";

export default function mic({ setDisplayText, setTranslatedText, setHelpData, helpData }) {
  const [chosenLanguage, setChosenLanguage] = useState("English");

  useEffect(() => {
    async function loadToken() {
      const tokenRes = await getTokenOrRefresh();
      if (tokenRes.authToken === null) {
        console.log(tokenRes.error);
        setDisplayText("ERROR: Speech To Text is unavailable at this moment");
      }
    }

    loadToken();
  }, []);

  const languagePack = {
    English: {
      translate: "en",
      stt: "en-US",
    },
    Chinese: {
      translate: "zh-Hans",
      stt: "zh-CN",
    },
    Cantonese: {
      translate: "yue",
      stt: "zh-HK",
    },
    Malay: {
      translate: "ms",
      stt: "ms-MY",
    },
  };

  async function translate(text) {
    // console.log(chosenLanguage);
    // console.log(languagePack[chosenLanguage].translate);

    // console.log(text);

    let { data } = await axios.post("/api/translate", {
      language: languagePack[chosenLanguage].translate,
      text,
    });

    let translatedText = data[0].translations[0].text;

    setTranslatedText(translatedText);
    setHelpData({ skills: helpData.skills, message: translatedText });
  }

  async function sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = languagePack[chosenLanguage].stt;

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    setDisplayText("speak into your microphone...");

    recognizer.recognizeOnceAsync(async (result) => {
      let recognizedText;
      if (result.reason === ResultReason.RecognizedSpeech) {
        recognizedText = `${result.text}`;
      } else {
        recognizedText =
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
      }

      await setDisplayText(recognizedText);
      await translate(recognizedText);
    });
  }

  return (
    <div className="mt-4 mb-3 sm:mt-10 sm:mb-0">
      <label
        htmlFor="skills"
        className="block mb-1 text-xs font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Speak in your native language:
      </label>
      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
        defaultValue={languagePack[chosenLanguage].stt}
        onChange={(e) => setChosenLanguage(e.target.value)}
      >
        {Object.keys(languagePack).map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          sttFromMic();
        }}
        className="inline-flex mt-4 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
      >
        Record
      </button>
    </div>
  );
}
