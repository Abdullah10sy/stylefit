import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "⚠️ Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file." });
    }

    const systemPrompt = `You are a friendly, expert personal fashion stylist AI for StyleAi. 
${context ? `The user context is: ${context}.` : 'The user has not provided their body type yet.'}
Give concise, practical, warm fashion advice in under 120 words. Use 1-2 relevant emojis. Be specific and helpful.`;

    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error?.message || "Error calling Gemini API");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't figure out an outfit for that!";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ reply: "❌ Currently experiencing a wardrobe malfunction. Please try again later!" });
  }
}
