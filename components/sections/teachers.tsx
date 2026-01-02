import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Teachers() {
  const teachers = [
    {
      name: "Priya Sharma",
      subject: "Mathematics",
      classes: "Class 8-12",
      experience: "5 years",
      bio: "Passionate about making math simple and enjoyable",
    },
    {
      name: "Rahul Verma",
      subject: "Science",
      classes: "Class 6-10",
      experience: "4 years",
      bio: "Believes in learning through experiments and practice",
    },
    {
      name: "Anjali Singh",
      subject: "English",
      classes: "Class 5-8",
      experience: "3 years",
      bio: "Makes English learning fun and interactive",
    },
    {
      name: "Aditya Kumar",
      subject: "Computer Science",
      classes: "Class 9-12",
      experience: "6 years",
      bio: "Expert in programming and logical thinking",
    },
  ]

  return (
    <section id="teachers" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Teachers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced educators committed to student success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teachers.map((teacher, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-32 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {teacher.name.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">{teacher.name}</h3>
                <Badge className="mt-2 mb-3">{teacher.subject}</Badge>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>
                    <span className="font-semibold text-foreground">Classes:</span> {teacher.classes}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Experience:</span> {teacher.experience}
                  </p>
                </div>
                <p className="text-sm italic text-muted-foreground">{teacher.bio}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Join our team of educators</p>
          <Link href="#contact">
            <Button>Become a Teacher</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
