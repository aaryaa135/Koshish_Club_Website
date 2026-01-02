import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Features from "@/components/sections/features"
import Resources from "@/components/sections/resources"
import ImpactStories from "@/components/sections/impact-stories"
import Teachers from "@/components/sections/teachers"
import Reviews from "@/components/sections/reviews"
import ParentGuide from "@/components/sections/parent-guide"
import Contact from "@/components/sections/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Resources />
      <ImpactStories />
      <Teachers />
      <ParentGuide />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  )
}
