import OpenAI from 'openai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, image } = await request.json();

    if (!prompt || !image) {
      return Response.json({ error: 'Missing prompt or image' }, { status: 400 });
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": process.env.HTTP_REFERER || "http://localhost:3000", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": process.env.X_TITLE || "Nano Banana Clone", // Optional. Site title for rankings on openrouter.ai.
      },
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            },
            {
              "type": "image_url",
              "image_url": {
                "url": image
              }
            }
          ]
        }
      ]
    });

    const result = completion.choices[0]?.message;
    return Response.json({ result });
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    return Response.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}