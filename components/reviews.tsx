export default function Reviews() {
  const reviews = [
    {
      author: "AIArtistPro",
      role: "Digital Creator",
      content:
        "This editor completely changed my workflow. The character consistency is incredible - miles ahead of competitors!",
    },
    {
      author: "ContentCreator",
      role: "UGC Specialist",
      content:
        "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    },
    {
      author: "PhotoEditor",
      role: "Professional Editor",
      content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    },
  ]

  return (
    <section id="reviews" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Creators Are Saying</h2>
          <p className="text-muted-foreground text-lg">Join thousands of creators transforming their workflow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 border border-border hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-foreground mb-6 italic leading-relaxed">"{review.content}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{review.author}</p>
                <p className="text-sm text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
