import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function Reviews() {
  const reviews = [
    {
      name: "Rajesh Kumar",
      relation: "Parent",
      rating: 5,
      text: "Koshish Club has been a game-changer for my son. The quality of teaching is excellent and completely free!",
    },
    {
      name: "Meera Patel",
      relation: "Student",
      rating: 5,
      text: "My grades improved significantly. The teachers are very supportive and the environment is great for learning.",
    },
    {
      name: "Vikram Singh",
      relation: "Parent",
      rating: 5,
      text: "Best educational initiative in our community. Highly recommend to all parents looking for quality education.",
    },
    {
      name: "Pooja Gupta",
      relation: "Student",
      rating: 5,
      text: "I finally understand concepts clearly. The way teachers explain things is so simple and effective.",
    },
  ]

  return (
    <section id="reviews" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Community Says</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students and parents about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">{review.text}</p>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.relation}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
