"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, TrendingUp, ArrowLeft, Star, Zap } from "lucide-react"

export default function StudentPortal() {
  const [student] = useState({
    id: 1,
    name: "Aarav Sharma",
    rollNo: 1,
    class: "Class 8",
    school: "DPS School, Delhi",
    guardianName: "Mr. Rajesh Sharma",
    guardianPhone: "+91-9876543210",
  })

  const [classes] = useState([
    {
      id: 1,
      name: "Mathematics",
      teacher: "Priya Sharma",
      attendance: 92,
      marks: [
        { test: "Unit Test 1", marks: 85, maxMarks: 100, comments: "Great effort! Keep practicing" },
        { test: "Unit Test 2", marks: 88, maxMarks: 100, comments: "Excellent improvement in problem-solving" },
        { test: "Mid-term", marks: 82, maxMarks: 100, comments: "Good, but focus on accuracy" },
      ],
      avgMarks: 85,
      milestones: [
        { title: "First Perfect Score", achieved: true, date: "2026-01-15" },
        { title: "5 Consecutive Attendance", achieved: true, date: "2026-01-20" },
        { title: "All Tests Above 80%", achieved: true, date: "2026-02-01" },
      ],
    },
    {
      id: 2,
      name: "Science",
      teacher: "Rahul Verma",
      attendance: 88,
      marks: [
        { test: "Unit Test 1", marks: 78, maxMarks: 100, comments: "Good understanding of basics" },
        { test: "Unit Test 2", marks: 80, maxMarks: 100, comments: "Focus on lab practicals" },
        { test: "Mid-term", marks: 76, maxMarks: 100, comments: "Review concepts before exams" },
      ],
      avgMarks: 78,
      milestones: [
        { title: "Science Lab Expert", achieved: true, date: "2026-01-25" },
        { title: "Perfect Attendance Month", achieved: false, date: null },
      ],
    },
  ])

  const [exams] = useState([
    {
      id: 1,
      subject: "Mathematics",
      date: "2026-02-15",
      time: "10:00 AM",
      duration: "3 hours",
      type: "Unit Test",
      prepStatus: 75,
    },
    {
      id: 2,
      subject: "Science",
      date: "2026-02-20",
      time: "2:00 PM",
      duration: "3 hours",
      type: "Unit Test",
      prepStatus: 60,
    },
    {
      id: 3,
      subject: "English",
      date: "2026-03-05",
      time: "10:00 AM",
      duration: "2 hours",
      type: "Quarterly Exam",
      prepStatus: 45,
    },
  ])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2">
            <ArrowLeft size={20} />
            Koshish Club
          </Link>
          <p className="text-sm opacity-90">Student Portal</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Student Info Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-2 border-dashed border-primary/30">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {student.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{student.name}</h1>
                <p className="text-muted-foreground">Welcome back! Ready to learn something awesome today?</p>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Class</p>
                    <p className="font-semibold">{student.class}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">School</p>
                    <p className="font-semibold text-sm">{student.school}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="milestones">Achievements</TabsTrigger>
            <TabsTrigger value="exams">Upcoming Tests</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <h2 className="text-2xl font-bold">Enrolled Classes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {classes.map((cls) => (
                <Card
                  key={cls.id}
                  className="p-6 border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{cls.name}</h3>
                      <p className="text-muted-foreground text-sm">Teacher: {cls.teacher}</p>
                    </div>
                    <Badge className="bg-primary">{cls.attendance}% Here</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-4">
                      <p className="text-muted-foreground text-sm">Average Score</p>
                      <p className="text-3xl font-bold text-primary">{cls.avgMarks}%</p>
                    </div>

                    <div className="space-y-3">
                      <p className="font-semibold text-sm text-muted-foreground">Recent Tests & Feedback</p>
                      {cls.marks.map((mark, idx) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg border border-border/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{mark.test}</span>
                            <span className="font-bold text-primary">
                              {mark.marks}/{mark.maxMarks}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground italic">{mark.comments}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <h2 className="text-2xl font-bold">Your Achievements</h2>
            <div className="space-y-4">
              {classes.map((cls) => (
                <Card key={cls.id} className="p-6">
                  <h3 className="font-bold text-lg mb-4">{cls.name} Milestones</h3>
                  <div className="space-y-3">
                    {cls.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                          milestone.achieved
                            ? "bg-primary/10 border-primary/30"
                            : "bg-muted/30 border-dashed border-muted-foreground/30"
                        }`}
                      >
                        <Star
                          size={24}
                          className={milestone.achieved ? "text-primary fill-primary" : "text-muted-foreground"}
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{milestone.title}</p>
                          {milestone.achieved && (
                            <p className="text-xs text-muted-foreground">Achieved on {milestone.date}</p>
                          )}
                        </div>
                        {milestone.achieved && <Badge className="bg-primary">Unlocked</Badge>}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <h2 className="text-2xl font-bold">Upcoming Tests & Exams</h2>
            <div className="space-y-4">
              {exams.map((exam) => (
                <Card key={exam.id} className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{exam.subject}</h3>
                          <Badge variant="outline" className="mt-2">
                            {exam.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {new Date(exam.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-semibold">{exam.time}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-semibold">{exam.duration}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Preparation Progress</p>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
                            style={{ width: `${exam.prepStatus}%` }}
                          />
                        </div>
                        <p className="text-xs mt-1 text-muted-foreground">{exam.prepStatus}% ready</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-bold">Overall Progress</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Classes Enrolled</p>
                    <p className="text-2xl font-bold">{classes.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Average Performance</p>
                    <p className="text-2xl font-bold">
                      {Math.round(classes.reduce((sum, c) => sum + c.avgMarks, 0) / classes.length)}%
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Zap className="text-secondary" size={24} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Achievements Unlocked</p>
                    <p className="text-2xl font-bold">
                      {classes.reduce((sum, c) => sum + c.milestones.filter((m) => m.achieved).length, 0)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Performance by Subject</h3>
              <div className="space-y-6">
                {classes.map((cls) => (
                  <div key={cls.id}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">{cls.name}</p>
                      <p className="font-bold text-primary">{cls.avgMarks}%</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full transition-all"
                        style={{ width: `${cls.avgMarks}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
