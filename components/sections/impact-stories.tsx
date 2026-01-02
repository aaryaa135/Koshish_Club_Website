"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp } from "lucide-react"

export default function ImpactStories() {
  const stories = [
    {
      id: 1,
      name: "Priya Sharma",
      class: "Class 10",
      improvement: "+35%",
      story:
        "I struggled with math, but with Koshish Club, I learned concepts that my school teachers didn't explain well. Now I score 95% in exams!",
      achievement: "School Topper",
      image: "P",
    },
    {
      id: 2,
      name: "Arjun Singh",
      class: "Class 8",
      improvement: "+28%",
      story:
        "Science was scary for me. The patient teachers here made it fun and easy. I now love experiments and want to be an engineer!",
      achievement: "Science Fair Winner",
      image: "A",
    },
    {
      id: 3,
      name: "Anaya Verma",
      class: "Class 6",
      improvement: "+42%",
      story:
        "I was shy and hesitant in classes. Koshish Club gave me confidence. My English is much better now, and I love reading!",
      achievement: "Most Improved",
      image: "An",
    },
  ]

  return (
    <section id="impact" className="py-16 bg-gradient-to-b from-secondary/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="cute-badge mb-4">Success Stories</Badge>
          <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet students whose lives have been transformed through Koshish Club. Real progress, real impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="p-6 border-2 border-dashed border-secondary/30 hover:border-secondary/60 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {story.image}
                </div>
                <div>
                  <h3 className="font-bold">{story.name}</h3>
                  <p className="text-xs text-muted-foreground">{story.class}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm italic text-muted-foreground">"{story.story}"</p>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <TrendingUp size={16} />
                  <span>Performance: {story.improvement}</span>
                </div>

                <Badge variant="outline" className="flex items-center gap-2 w-fit">
                  <Award size={14} />
                  {story.achievement}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
