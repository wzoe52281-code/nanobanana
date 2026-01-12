export default function Showcase() {
  const showcases = [
    {
      title: "Ultra-Fast Mountain Generation",
      description: "Created in 0.8 seconds with Nano Banana",
      speed: "0.8s",
    },
    {
      title: "Instant Garden Creation",
      description: "Complex scene rendered in milliseconds",
      speed: "0.3s",
    },
    {
      title: "Real-time Beach Synthesis",
      description: "Photorealistic results at lightning speed",
      speed: "0.6s",
    },
    {
      title: "Rapid Aurora Generation",
      description: "Advanced effects processed instantly",
      speed: "0.5s",
    },
  ]

  return (
    <section id="showcase" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Lightning-Fast AI Creations</h2>
          <p className="text-muted-foreground text-lg">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {showcases.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all group cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-secondary/30 group-hover:opacity-75 transition-opacity"></div>
                <div className="text-6xl relative z-10">✨</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="text-accent font-bold text-sm bg-accent/10 px-3 py-1 rounded-full">
                    {item.speed}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors">
            Try Nano Banana Generator
          </button>
        </div>
      </div>
    </section>
  )
}
