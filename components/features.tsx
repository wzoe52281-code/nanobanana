export default function Features() {
  const features = [
    {
      icon: "✨",
      title: "Natural Language Editing",
      description: "Edit images using simple text prompts. Nano Banana understands complex instructions.",
    },
    {
      icon: "👤",
      title: "Character Consistency",
      description: "Maintain perfect character details across edits. Preserve faces and identities.",
    },
    {
      icon: "🎨",
      title: "Scene Preservation",
      description: "Seamlessly blend edits with original backgrounds. Superior scene fusion.",
    },
    {
      icon: "⚡",
      title: "One-Shot Editing",
      description: "Perfect results in a single attempt. Nano Banana solves editing challenges effortlessly.",
    },
    {
      icon: "📸",
      title: "Multi-Image Support",
      description: "Process multiple images simultaneously for advanced editing workflows.",
    },
    {
      icon: "🎬",
      title: "AI UGC Creation",
      description: "Create consistent AI influencers and content. Perfect for marketing campaigns.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Nano Banana?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The most advanced AI image editor with revolutionary features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:bg-card/50 transition-all group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
