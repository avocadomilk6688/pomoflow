import { GoogleGenAI } from '@google/genai';

// 1. Initialize with the object pattern
const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export const getAiAdvice = async (task: string, isWorkMode: boolean) => {
    const prompt = `
        You are PomoFlow AI. The user is in ${isWorkMode ? 'Focus' : 'Rest'} mode.
        Current Task: "${task}"
        
        Return a JSON object:
        1. "quote": A short, witty motivation quote (max 12 words) about the task.
        2. "color": A deep, vibrant, or saturated HEX code that matches the task's vibe.
        
        CRITICAL RULES:
        - The font on top is WHITE, so the color MUST be dark or saturated enough for contrast.
        - Avoid very light colors or pastels.
        - Examples: #1B263B (Deep Blue), #2D6A4F (Forest Green), #6A040F (Wine Red), #3C096C (Deep Purple).
        - Return ONLY JSON. No markdown.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const rawText = response.text;

        if (!rawText) {
            throw new Error("AI returned an empty response");
        }

        const cleanedJson = rawText.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanedJson);

    } catch (error) {
        console.error("Gemini SDK Error:", error);

        return {
            quote: isWorkMode ? "Focusing on the task. You've got this." : "Time to breathe and recharge.",
            color: isWorkMode ? "#FDFCF0" : "#F0F9FF"
        };
    }
};