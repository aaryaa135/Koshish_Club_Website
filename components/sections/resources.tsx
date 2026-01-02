import { Button } from "@/components/ui/button"
import { BookOpen, LinkIcon } from "lucide-react"

export default function Resources() {
  const resources = [
    { title: "NCERT Books", subjects: ["Math", "Science", "English", "Social Studies"] },
    { title: "Sample Papers", subjects: ["Previous Years", "Model Tests", "Practice Sets"] },
    { title: "Video Tutorials", subjects: ["Mathematics", "Science", "Languages"] },
    { title: "Study Notes", subjects: ["Chapter Summaries", "Formulas", "Key Concepts"] },
  ]

  return (
    <section id="resources" className="py-16 md:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Learning Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free study materials and resources for all students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resources.map((resource, idx) => (
            <div key={idx} className="bg-card rounded-xl p-6 border border-border">
              <BookOpen size={28} className="text-primary mb-3" />
              <h3 className="text-lg font-bold mb-3">{resource.title}</h3>
              <div className="space-y-2 mb-4">
                {resource.subjects.map((subject, sidx) => (
                  <p key={sidx} className="text-sm text-muted-foreground">
                    {subject}
                  </p>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                <LinkIcon size={16} /> Access
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            More resources coming soon. Contact coordinators for specific study materials.
          </p>
        </div>
      </div>
    </section>
  )
}
