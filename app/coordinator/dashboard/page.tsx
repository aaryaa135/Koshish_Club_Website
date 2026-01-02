"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, Users, BookOpen, TrendingUp, BarChart3, Send, Bell, Home } from "lucide-react"

export default function CoordinatorDashboard() {
  const router = useRouter()
  const [coordinatorEmail, setCoordinatorEmail] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("coordinatorEmail")
    if (!email) {
      router.push("/coordinator/login")
    } else {
      setCoordinatorEmail(email)
    }
  }, [router])

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "New Teacher Onboarded", desc: "Welcome Priya Sharma, Math teacher", date: "2 days ago" },
    { id: 2, title: "Student Milestone", desc: "50 students completed 100% attendance", date: "1 week ago" },
  ])

  const [activeClasses] = useState([
    { id: 1, name: "Math Class 8", teacher: "Priya Sharma", students: 25, attendance: 92 },
    { id: 2, name: "Science Class 10", teacher: "Rahul Verma", students: 18, attendance: 88 },
    { id: 3, name: "English Class 8", teacher: "Neha Gupta", students: 22, attendance: 85 },
  ])

  const [attendanceData] = useState([
    { week: "Week 1", attendance: 88 },
    { week: "Week 2", attendance: 91 },
    { week: "Week 3", attendance: 89 },
    { week: "Week 4", attendance: 94 },
  ])

  const handleLogout = () => {
    localStorage.removeItem("coordinatorEmail")
    localStorage.removeItem("coordinatorId")
    router.push("/coordinator/login")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2">
              <Home size={20} />
              <span className="hidden sm:inline">Koshish Club</span>
            </Link>
            <p className="text-sm opacity-90">{coordinatorEmail}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent" size="sm">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <BookOpen className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Classes</p>
                <p className="text-3xl font-bold">{activeClasses.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Users className="text-accent" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Students</p>
                <p className="text-3xl font-bold">{activeClasses.reduce((sum, c) => sum + c.students, 0)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-secondary" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg Attendance</p>
                <p className="text-3xl font-bold">
                  {Math.round(activeClasses.reduce((sum, c) => sum + c.attendance, 0) / activeClasses.length)}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Reports</p>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Active Classes</h3>
                <div className="space-y-3">
                  {activeClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{cls.name}</p>
                        <p className="text-xs text-muted-foreground">{cls.teacher}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{cls.students} students</p>
                        <p className="text-xs text-primary">{cls.attendance}% attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Recent Activities</h3>
                  <Bell size={20} className="text-primary" />
                </div>
                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="border-b border-border pb-4 last:border-0">
                      <p className="font-semibold text-sm">{ann.title}</p>
                      <p className="text-xs text-muted-foreground">{ann.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ann.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">All Classes</h2>
              <Button className="gap-2">
                <BookOpen size={18} /> New Class
              </Button>
            </div>
            <div className="grid gap-4">
              {activeClasses.map((cls) => (
                <Card key={cls.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{cls.name}</h3>
                      <p className="text-muted-foreground">Teacher: {cls.teacher}</p>
                    </div>
                    <div className="text-right">
                      <Badge>{cls.students} Students</Badge>
                      <p className="text-sm text-primary mt-2">{cls.attendance}% Attendance Rate</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Attendance Trends</h3>
              <div className="space-y-4">
                {attendanceData.map((data, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">{data.week}</p>
                      <p className="text-sm font-bold text-primary">{data.attendance}%</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                        style={{ width: `${data.attendance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Post Announcement</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Announcement title"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <textarea
                  placeholder="Write your announcement here..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                />
                <Button className="gap-2">
                  <Send size={18} /> Post Announcement
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">All Announcements</h3>
              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="border border-border rounded-lg p-4">
                    <p className="font-bold">{ann.title}</p>
                    <p className="text-muted-foreground text-sm">{ann.desc}</p>
                    <p className="text-xs text-muted-foreground mt-2">{ann.date}</p>
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
