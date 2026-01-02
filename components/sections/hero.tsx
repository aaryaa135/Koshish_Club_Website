import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Zap } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/15 via-accent/10 to-secondary/5 py-20 md:py-40">
      <div className="absolute top-10 left-5 w-20 h-20 bg-primary/20 rounded-3xl blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-bounce-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="fun-badge">
              <Sparkles size={18} />
              <span>Making Learning Fun & Free</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-balance leading-tight">
              Learning is
              <br />
              <span className="fun-gradient bg-clip-text text-transparent">Super Fun!</span>
            </h1>

            <p className="text-xl text-foreground/70 leading-relaxed font-medium">
              Join many students discovering that learning doesn't have to feel like work. Get help from amazing
              teachers, track your awesome progress, and grow at your own pace. 100% free. Zero pressure. Just pure
              learning joy!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#about">
                <Button className="fun-button fun-gradient text-white border-0 text-lg" size="lg">
                  Get Started <Zap size={20} />
                </Button>
              </Link>
              <Link href="/student">
                <Button
                  className="fun-button bg-white border-2 border-primary text-primary text-lg font-bold hover:bg-primary/10"
                  size="lg"
                >
                  Student Portal
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="fun-card bg-gradient-to-br from-primary/10 to-primary/5">
                <p className="text-4xl font-black text-primary">50+</p>
                <p className="text-sm font-semibold text-muted-foreground">Happy Students</p>
              </div>
              <div className="fun-card bg-gradient-to-br from-accent/10 to-accent/5">
                <p className="text-4xl font-black text-accent">50+</p>
                <p className="text-sm font-semibold text-muted-foreground">Cool Teachers</p>
              </div>
              <div className="fun-card bg-gradient-to-br from-secondary/10 to-secondary/5">
                <p className="text-4xl font-black text-secondary">100%</p>
                <p className="text-sm font-semibold text-muted-foreground">Free Forever</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/20 rounded-3xl border-4 border-primary/40 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 animate-bounce-slow">
                    <div className="text-8xl">🎓</div>
                    <p className="text-2xl font-bold text-primary">Learn & Grow!</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-6xl animate-float">📚</div>
              <div className="absolute top-10 -left-10 text-7xl animate-bounce-slow">✨</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
