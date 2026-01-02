import { Users, BookMarked, TrendingUp, Award } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Passionate educators who love teaching",
      emoji: "👨‍🏫",
      color: "from-primary/10 to-primary/5",
      borderColor: "border-primary/30",
    },
    {
      icon: BookMarked,
      title: "Fun Learning",
      description: "NCERT aligned but never boring",
      emoji: "📖",
      color: "from-accent/10 to-accent/5",
      borderColor: "border-accent/30",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "See your improvement over time",
      emoji: "📈",
      color: "from-secondary/10 to-secondary/5",
      borderColor: "border-secondary/30",
    },
    {
      icon: Award,
      title: "Earn Badges",
      description: "Get recognized for your achievements",
      emoji: "🏆",
      color: "from-orange-100 to-orange-50",
      borderColor: "border-orange-300",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-black">What Makes Us Cool 🚀</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto font-medium">
            Everything you need to become the best version of yourself
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className={`fun-card bg-gradient-to-br ${feature.color} border-2 ${feature.borderColor}`}>
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                <p className="text-muted-foreground font-medium">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
