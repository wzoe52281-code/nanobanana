import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Editor from "@/components/editor"
import Features from "@/components/features"
import Showcase from "@/components/showcase"
import Reviews from "@/components/reviews"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Editor />
      <Features />
      <Showcase />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  )
}
