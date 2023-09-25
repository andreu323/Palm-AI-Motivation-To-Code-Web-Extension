import { API_KEY } from "~/config";
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=' + API_KEY;


export async function generateText(title, author) {
    const promt = `motivate me to code and design in style "bro" and take me from watching videos the title is "${title}" video author nickname is  "${author}"
        do not use characters like * or at ur answer.
        do not format ur answer.  
        keep your answer at 50 characters maximum.
    `;
    const prompt = {
        "prompt": { "text": promt },

        "temperature": 0.7,
        "candidate_count": 1,
        "top_k": 40,
        "top_p": 0.95,
        "max_output_tokens": 1024,
        "stop_sequences": [],
        "safety_settings": [{ "category": "HARM_CATEGORY_DEROGATORY", "threshold": 4 }, { "category": "HARM_CATEGORY_TOXICITY", "threshold": 4 }, { "category": "HARM_CATEGORY_VIOLENCE", "threshold": 4 }, { "category": "HARM_CATEGORY_SEXUAL", "threshold": 1 }, { "category": "HARM_CATEGORY_MEDICAL", "threshold": 4 }, { "category": "HARM_CATEGORY_DANGEROUS", "threshold": 4 }]
    };

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(prompt)
    });

    const text = await response.json();

    return text.candidates[0].output;
}
