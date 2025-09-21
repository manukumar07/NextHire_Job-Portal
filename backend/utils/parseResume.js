
import * as genai from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini client
const ai = new genai.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Parse resume text using Gemini API
 */
export const parseResumeText = async (resumeText) => {
    const prompt = `
Extract the following from this resume text in STRICT JSON format WITHOUT extra explanation:

{
"name": "",
"email": "",
"phone": "",
"location": "",
"skills": [],
"experience": [],
"education": [],
}

Resume Text: ${resumeText}
  `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    // Clean response in case Gemini adds extra characters
    let cleanText = response.text.trim();
    if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace(/```json|```/g, "").trim();
    }


    try {
        return JSON.parse(cleanText);
    } catch (err) {
        console.warn("JSON parsing failed, returning raw text");
        return { rawText: cleanText };
    }
};