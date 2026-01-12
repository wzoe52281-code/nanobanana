"use client"

import type React from "react"
import { geminiClient } from '@/lib/apis/gemini-api'

import { useState, useRef } from "react"

export default function Editor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Array<{id: string, content: string, isImage: boolean}>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (uploadedImage && prompt) {
      setIsGenerating(true)
       try {
        const result = await geminiClient.generateImageFromPrompt({
          imageUrl: uploadedImage,
          prompt: prompt
        });
        console.log("Generated image:", result);
        
         if (result.generatedImageUrl) {
          // Add the generated image to the gallery
          setGeneratedImages(prev => [{
            id: Date.now().toString(),
            content: result.generatedImageUrl!,
            isImage: true
          }, ...prev]);
        } else if (result.textResponse) {
          // If no image URL was found, add the text response to the gallery
          setGeneratedImages(prev => [{
            id: Date.now().toString(),
            content: result.textResponse!,
            isImage: false
          }, ...prev]);
        } else if (result.error) {
          console.error("Error generating image:", result.error);
        }
      } catch (error) {
        console.error("Error generating image:", error);
        // Optionally display an error message to the user
      } finally {
        setIsGenerating(false);
      }
    }
  }

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started</h2>
          <p className="text-muted-foreground text-lg">
            Experience the power of Nano Banana's natural language image editing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Upload */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-semibold mb-6">Upload Image</h3>

            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all text-center"
              >
                <div className="text-4xl mb-4">📸</div>
                <p className="font-semibold mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">Max 10MB</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-square mb-4">
                <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-full object-cover" />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-lg hover:bg-destructive/90"
                >
                  ✕
                </button>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          {/* Prompt & Generate */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-semibold mb-6">AI Prompt</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Describe your edits</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Place the person in a snowy mountain, change the background to sunset..."
                  className="w-full h-24 bg-secondary border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Model:</span> Nano Banana Pro
                </p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!uploadedImage || !prompt || isGenerating}
                className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? "Generating..." : "Generate Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Output Gallery */}
        <div className="mt-8 bg-card rounded-2xl p-8 border border-border">
          <h3 className="text-xl font-semibold mb-6">Output Gallery</h3>
          {generatedImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedImages.map((item) => (
                <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-white border border-border">
                  {item.isImage ? (
                    <img 
                      src={item.content} 
                      alt={`Generated`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the URL is not an image, show the text content instead
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="flex items-center justify-center h-full p-2 text-center text-xs break-words">${item.content}</div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full p-2 text-center text-xs break-words">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {isGenerating ? (
                <div>
                  <div className="inline-block mb-4">
                    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p>Creating your AI masterpiece...</p>
                </div>
              ) : (
                <p>Generated images will appear here instantly</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
