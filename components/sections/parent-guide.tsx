"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, MessageSquare, BarChart3, Heart } from "lucide-react"

export default function ParentGuide() {
  const guides = [
    {
      icon: CheckCircle2,
      title: "Progress Tracking",
      desc: "Understand how your child is performing with our simple progress reports, not just grades but growth!",
    },
    {
      icon: MessageSquare,
      title: "Teacher Communication",
      desc: "Regular updates from teachers about your child's learning journey, strengths, and areas to work on.",
    },
    {
      icon: BarChart3,
      title: "Exam Preparation",
      desc: "Know when exams are happening and how we're preparing your child with curated resources and mock tests.",
    },
    {
      icon: Heart,
      title: "Holistic Development",
      desc: "We focus on building confidence and love for learning, not just cramming for tests.",
    },
  ]

  return (
    <section id="parents" className="py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="cute-badge mb-4">For Parents</Badge>
          <h2 className="text-4xl font-bold mb-4">How We Support Your Child</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe education is a partnership between teachers, students, and parents. Here's how we keep you
            involved and informed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, idx) => {
            const Icon = guide.icon
            return (
              <Card
                key={idx}
                className="p-6 border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{guide.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">{guide.desc}</p>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-dashed border-primary/30">
          <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span> No pressure, no ranking systems - we focus on growth
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span> Regular feedback with encouraging comments, not just
              marks
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span> Free resources aligned with NCERT and school curriculum
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span> One-on-one attention in small class batches
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span> Zero cost - we believe quality education is a right, not
              a privilege
            </li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
