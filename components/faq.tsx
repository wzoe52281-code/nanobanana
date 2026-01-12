"use client"

import { useState } from "react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is Nano Banana?",
      answer:
        "Nano Banana is a revolutionary AI image editing model that transforms photos using natural language prompts. It offers superior performance in consistent character editing and scene preservation.",
    },
    {
      question: "How does it work?",
      answer:
        'Simply upload an image and describe your desired edits in natural language. The AI understands complex instructions like "place in a snowy mountain" and generates perfectly edited images instantly.',
    },
    {
      question: "How is it better than other tools?",
      answer:
        "Nano Banana excels in character consistency, scene blending, and one-shot editing. Users report superior facial feature preservation and seamless integration with backgrounds.",
    },
    {
      question: "Can I use it for commercial projects?",
      answer:
        "Yes! Nano Banana is perfect for creating AI UGC content, social media campaigns, and marketing materials. High-quality outputs are suitable for professional use.",
    },
    {
      question: "What types of edits can it handle?",
      answer:
        "The editor handles complex edits including face completion, background changes, object placement, style transfers, and character modifications with photorealistic quality.",
    },
    {
      question: "Where can I try Nano Banana?",
      answer:
        "You can try Nano Banana directly on this website. Simply upload your image, enter a text prompt, and watch as Nano Banana transforms your photo.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Find answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-secondary/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                <span className="text-accent text-2xl flex-shrink-0">{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-border bg-secondary/30">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
