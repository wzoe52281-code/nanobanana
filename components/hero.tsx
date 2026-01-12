export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      {/* Decorative banana elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-10 pointer-events-none">🍌</div>
      <div className="absolute bottom-20 left-5 text-5xl opacity-10 pointer-events-none">🍌</div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
          <span className="text-accent font-semibold text-sm">🍌 New Nano Banana Pro is now live</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          Transform Any Image with <span className="text-accent">Simple Text Prompts</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          Nano Banana's advanced AI model delivers consistent character editing and scene preservation that surpasses
          competitors. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors text-lg">
            Start Editing
          </button>
          <button className="px-8 py-3 bg-secondary text-foreground font-semibold rounded-full hover:bg-secondary/80 transition-colors text-lg border border-border">
            View Examples
          </button>
        </div>
      </div>
    </section>
  )
}
