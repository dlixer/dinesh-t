import { GoogleGenAI } from "@google/genai";

export const generateAutomationIdea = async (prompt: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API key not found.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are an expert in Instagram marketing automation. Your task is to generate a simple, step-by-step automation plan based on a user's goal.
The plan should be clear and concise, outlining a trigger and a series of actions.
Example user goal: "When someone comments on my latest post with the word 'giveaway', send them a DM with a link and reply to their comment."
Example output:
"**Trigger:**
- A user comments on any of your posts with the exact keyword 'giveaway'.

**Actions:**
1.  **Send DM to commenter:** "Thanks for entering the giveaway! Here's your special link: [your link here]. Good luck!"
2.  **Reply to the comment:** "Thanks for entering! I've sent you a DM with the details. ✨"
"

Provide the output in simple text format, using markdown for bolding and lists.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text;

  } catch (error) {
    console.error("Error generating automation idea with Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return `An error occurred while generating the idea: ${errorMessage}. Please check your API key and try again.`;
  }
};
