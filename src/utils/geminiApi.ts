import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

const callGemini = async (prompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const rawText = response.text;
        if (!rawText) throw new Error("AI returned an empty response");

        const cleanedJson = rawText.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanedJson);
    } catch (error) {
        console.error("Gemini SDK Error:", error);
        return null;
    }
};

export const getSessionVibe = async (task: string, isWorkMode: boolean) => {
    const prompt = `
        You are PomoFlow AI. The user is starting a ${isWorkMode ? 'Focus' : 'Rest'} mode session.
        Current Task: "${task}"
        
        Return a JSON object:
        1. "quote": A short, witty motivation quote (max 12 words).
        2. "color": A vibrant/saturated HEX code matching the task's vibe.
        3. "sound": Choose from: [Cafe, Fire, Forest, Ocean, Office, Rain, Storm].
        
        RULES: White font contrast is vital, so color MUST be saturated. No light colors.
        Return ONLY JSON. No markdown.
    `;

    const data = await callGemini(prompt);
    
    return data || {
        quote: isWorkMode ? "Let's crush this." : "Time to recharge.",
        color: isWorkMode ? "#769e37" : "#c1df3b", 
        sound: "Rain"
    };
};

export const getQuoteRefresh = async (task: string, isWorkMode: boolean) => {
    const prompt = `
        The user is currently in ${isWorkMode ? 'Focus' : 'Rest'} mode for: "${task}".
        Return a JSON object:
        1. "quote": A short, fresh, witty motivation quote (max 12 words).
        
        Return ONLY JSON. No markdown.
    `;

    const data = await callGemini(prompt);
    return data?.quote || (isWorkMode ? "Keep pushing!" : "Breathe in, breathe out.");
};