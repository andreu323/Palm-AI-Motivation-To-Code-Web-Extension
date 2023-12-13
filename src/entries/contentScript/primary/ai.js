import { API_KEY } from "~/config";
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY;
const languege = "ENGLISH";

export async function generateText(title, author) {
    const promt = `
        motivate user to code and design in answer in style of "bro" and make him stop watching videos make ur answer with the video context, user is watching youtube video and title is "${title}" video author nickname is  "${author}"
        do not use characters like * or at ur answer.
        do not format ur answer.  
        keep your answer at 30 characters maximum.
        answer on this languege: ${languege}
    `;
    const prompt = {
        "contents": [
            { 
              "parts": [
                {
                  "text": promt
                }
              ]
            }
          ],
          "generationConfig": {
            "temperature": 0.9,
            "topK": 1,
            "topP": 1,
            "maxOutputTokens": 2048,
            "stopSequences": []
          },
          "safetySettings": [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_ONLY_HIGH"
              },
              {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_ONLY_HIGH"
              },
              {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_ONLY_HIGH"
              },
              {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH"
              }
          ]
    };

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(prompt)
    });

    const text = await response.json();

    return text.candidates[0]?.content?.parts[0]?.text;
}
