"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, LinkIcon } from "lucide-react"

export default function Resources() {
  const [showModal, setShowModal] = useState(false)
  const [selectedResource, setSelectedResource] = useState("")

  const resources = [
    { title: "NCERT Books", subjects: ["Math", "Science", "English", "Social Studies"], icon: BookOpen },
    { title: "Sample Papers", subjects: ["Previous Years", "Model Tests", "Practice Sets"], icon: LinkIcon },
    { title: "Video Tutorials", subjects: ["Mathematics", "Science", "Languages"], icon: LinkIcon },
    { title: "Study Notes", subjects: ["Chapter Summaries", "Formulas", "Key Concepts"], icon: BookOpen },
  ]

  const resourceActions = {
    "NCERT Books": () => {
      setSelectedResource("NCERT Books")
      setShowModal(true)
    },
    "Sample Papers": () => {
      setSelectedResource("Sample Papers")
      setShowModal(true)
    },
    "Video Tutorials": () => {
      setSelectedResource("Video Tutorials")
      setShowModal(true)
    },
    "Study Notes": () => {
      setSelectedResource("Study Notes")
      setShowModal(true)
    },
  }

  const handleCloseModal = () => setShowModal(false)

  return (
    <section id="resources" className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Learning Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free study materials and resources for all students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resources.map((resource) => (
            <div key={resource.title} className="fun-card bg-card rounded-xl p-6 border border-primary/30">
              <resource.icon size={28} className="text-primary mb-3" />
              <h3 className="text-lg font-bold mb-3">{resource.title}</h3>
              <div className="space-y-2 mb-4">
                {resource.subjects.map((subject) => (
                  <p key={subject} className="text-sm text-muted-foreground">
                    {subject}
                  </p>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 bg-transparent"
                onClick={() => resourceActions[resource.title]()}
              >
                <LinkIcon size={16} /> Access
              </Button>
            </div>
          ))}
        </div>

        {/* Resource Detail Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  {selectedResource}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-muted-foreground mb-6">
                {getResourceContent(selectedResource)}
              </p>
              <div className="space-y-4">
                <Button
                  onClick={handleCloseModal}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            More resources coming soon. Contact coordinators for specific study materials.
          </p>
        </div>
      </div>
    </section>
  )
}

function getResourceContent(resource: string): string {
  const contents = {
    "NCERT Books": 
      "NCERT (National Council of Educational Research and Training) textbooks are the standard curriculum books used in Indian schools. They cover Math, Science, Social Science, and Languages for classes 1-12. These books are available free on the NCERT website at ncert.nic.in. Would you like us to notify your coordinator about specific class levels you need?",
    
    "Sample Papers": 
      "Sample papers are practice tests based on previous years' exam patterns. They help students familiarize themselves with the exam format and question types. We regularly upload sample papers for all subjects. Would you like us to notify your coordinator about which class level you need?",
    
    "Video Tutorials": 
      "Video tutorials provide visual and auditory learning experiences for complex concepts. We have curated video content covering Math, Science, and Languages aligned with the NCERT curriculum. Would you like us to notify your coordinator about specific subjects or class levels?",
    
    "Study Notes": 
      "Study notes are concise summaries of key concepts, formulas, and important questions for quick revision. We provide chapter-wise notes aligned with the NCERT curriculum. Would you like us to notify your coordinator about specific class levels or subjects?"
  }
  return contents[resource] || "Resources are coming soon. Contact our coordinators for specific study materials."
}