import OpenAI from 'openai';

export interface ImageGenerationRequest {
  imageUrl: string;
  prompt: string;
}

export interface ImageGenerationResponse {
  generatedImageUrl?: string;
  textResponse?: string;
  error?: string;
}

class GeminiAPIClient {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000", 
        "X-Title": "Nano Banana Clone",
      },
      dangerouslyAllowBrowser:true
    });
  }

  async generateImageFromPrompt(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      // Using any type to allow access to non-standard properties
      const completion: any = await this.client.chat.completions.create({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: request.prompt },
              { 
                type: "image_url", 
                image_url: { url: request.imageUrl } 
              }
            ],
          }
        ],
      });

      // Access the images array from the response
      const message = completion.choices[0]?.message;
      const imagesArray = message?.images;
      
      if (imagesArray && Array.isArray(imagesArray) && imagesArray.length > 0) {
        // Return the first image from the images array
        return { generatedImageUrl: imagesArray[0].image_url.url };
      }
      
      // If no images found in the images array, check if there's content
      const responseContent = message?.content;
      if (responseContent) {
        return { textResponse: responseContent as string };
      }
      
      return { error: "No response was returned by the API" };
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return { error: `API Error: ${error instanceof Error ? error.message : "Unknown error occurred"}` };
    }
  }
}

export const geminiClient = new GeminiAPIClient();