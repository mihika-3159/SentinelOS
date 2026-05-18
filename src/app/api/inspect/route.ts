import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, agent } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json({ error: "No API key" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemPrompt = `You are SentinelOS, an enterprise AI governance trust layer. 
    Analyze the following prompt sent to the "${agent}".
    Determine the risk level (LOW, MEDIUM, HIGH, CRITICAL), detected intent, policy action (ALLOW, DENY, LOG, HUMAN_REVIEW, QUARANTINE, RATE_LIMIT), provide an explanation, and recommend mitigation.
    Respond ONLY in valid JSON format matching this schema:
    {
      "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "detectedIntent": "string",
      "policyAction": "ALLOW" | "DENY" | "LOG" | "HUMAN_REVIEW" | "QUARANTINE" | "RATE_LIMIT",
      "explanation": "string",
      "recommendedMitigation": "string"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\nPrompt to analyze: " + prompt }] }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from Gemini");
    }

    return NextResponse.json(JSON.parse(resultText));

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
