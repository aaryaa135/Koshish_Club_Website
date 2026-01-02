"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Briefcase, Send } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const coordinators = [
    {
      name: "Rahul Sharma",
      role: "Club Coordinator",
      phone: "+91-9876543210",
      email: "rahul@koshishclub.org",
    },
    {
      name: "Neha Singh",
      role: "Academic Lead",
      phone: "+91-9876543211",
      email: "neha@koshishclub.org",
    },
    {
      name: "Arjun Patel",
      role: "Student Coordinator",
      phone: "+91-9876543212",
      email: "arjun@koshishclub.org",
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // <BACKEND_CONNECTION> Replace with actual backend API call
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    alert("Thank you for reaching out! We will get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <Badge className="cute-badge mx-auto">Get In Touch</Badge>
          <h2 className="text-4xl font-bold">Connect With Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Want to join Koshish Club? Reach out to our coordinators anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 border-2 border-dashed border-primary/20">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Your awesome name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send size={18} /> Send Message
              </Button>
            </form>
          </Card>

          {/* Coordinators Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Friendly Coordinators</h3>
              <div className="space-y-4">
                {coordinators.map((coord, idx) => (
                  <Card
                    key={idx}
                    className="p-6 border-2 border-dashed border-secondary/20 hover:border-secondary/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{coord.name}</h4>
                        <p className="text-sm text-accent font-semibold mb-3">{coord.role}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                            <Phone size={16} className="text-primary" />
                            <a href={`tel:${coord.phone}`}>{coord.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                            <Mail size={16} className="text-primary" />
                            <a href={`mailto:${coord.email}`}>{coord.email}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 text-lg">Office Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Mon-Fri:</strong> 4:00 PM - 7:00 PM
                </p>
                <p>
                  <strong className="text-foreground">Saturday:</strong> 10:00 AM - 2:00 PM
                </p>
                <p>
                  <strong className="text-foreground">Sunday:</strong> Closed (Resting day)
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
