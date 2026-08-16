export default function About() {
  const initiatives = [
    { text: "Free Classes", emoji: "🎓" },
    { text: "Evening Classes for School Kids", emoji: "👧" },
    { text: "School-Aligned Curriculum", emoji: "📚" },
    { text: "Experienced & Passionate Teachers", emoji: "👨‍🏫" },
    { text: "Individual Attention & Guidance", emoji: "💬" },
    { text: "Regular Progress Tracking", emoji: "📊" },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-secondary/15 via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-balance">
                About <span className="fun-gradient bg-clip-text text-transparent">Koshish</span>
              </h2>
              <p className="text-lg text-foreground/70 font-medium">
                We're on a mission to prove that incredible education doesn't have to cost a single rupee. We believe
                every kid deserves to unlock their potential, and we're here to make that happen!
              </p>
            </div>

            <div className="space-y-4">
              {initiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/30 hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="font-bold text-primary">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="space-y-6">
            <div className="fun-card bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <h3 className="text-2xl font-black text-primary mb-3">🎯 Our Mission</h3>
              <p className="text-foreground/70 font-medium">
                To empower every single student with world-class education, no matter their background. We believe in
                unlocking potential, building confidence, and creating future leaders!
              </p>
            </div>

            <div className="fun-card bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <h3 className="text-2xl font-black text-accent mb-3">✨ Our Vision</h3>
              <p className="text-foreground/70 font-medium">
                Imagine a world where education is a right, not a privilege. Where every kid can dream big and has
                access to the tools to make those dreams real. That's the Koshish world!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
