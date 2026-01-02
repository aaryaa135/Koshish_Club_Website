"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, Plus, Edit2, Trash2, Users, BookOpen, TrendingUp, Home } from "lucide-react"

export default function TeacherDashboard() {
  const router = useRouter()
  const [teacherEmail, setTeacherEmail] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("teacherEmail")
    if (!email) {
      router.push("/teacher/login")
    } else {
      setTeacherEmail(email)
    }
  }, [router])

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Class 8 Mathematics",
      subject: "Mathematics",
      level: "Class 8",
      students: [
        { id: 1, name: "Aarav Sharma", roll: 1, attendance: 92, avgMarks: 85, nextExam: "2026-02-15" },
        { id: 2, name: "Bhavna Singh", roll: 2, attendance: 88, avgMarks: 78, nextExam: "2026-02-15" },
      ],
    },
    {
      id: 2,
      name: "Class 10 Science",
      subject: "Science",
      level: "Class 10",
      students: [
        { id: 3, name: "Chetan Kumar", roll: 1, attendance: 95, avgMarks: 92, nextExam: "2026-02-20" },
        { id: 4, name: "Disha Patel", roll: 2, attendance: 90, avgMarks: 88, nextExam: "2026-02-20" },
      ],
    },
  ])

  const [activeClass, setActiveClass] = useState(classes[0])
  const [showAddClass, setShowAddClass] = useState(false)
  const [newClass, setNewClass] = useState({ name: "", subject: "", level: "" })

  const handleAddClass = () => {
    if (newClass.name && newClass.subject) {
      const classObj = {
        id: classes.length + 1,
        ...newClass,
        students: [],
      }
      setClasses([...classes, classObj])
      setActiveClass(classObj)
      setNewClass({ name: "", subject: "", level: "" })
      setShowAddClass(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("teacherEmail")
    localStorage.removeItem("teacherPassword")
    localStorage.removeItem("teacherId")
    router.push("/teacher/login")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2">
              <Home size={20} />
              <span className="hidden sm:inline">Koshish Club</span>
            </Link>
            <p className="text-sm opacity-90">{teacherEmail}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent" size="sm">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Classes</p>
                <p className="text-2xl font-bold">{classes.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="text-accent" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Students</p>
                <p className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.students.length, 0)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-secondary" size={24} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg. Performance</p>
                <p className="text-2xl font-bold">
                  {classes.length === 0
                    ? 0
                    : Math.round(
                        classes.reduce((sum, c) => sum + c.students.reduce((s, st) => s + st.avgMarks, 0), 0) /
                          Math.max(
                            1,
                            classes.reduce((sum, c) => sum + c.students.length, 0),
                          ),
                      )}
                  %
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="manage">Create Class</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Classes</h2>
              <Button onClick={() => setShowAddClass(true)} className="gap-2">
                <Plus size={18} /> Add Class
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <Card
                  key={cls.id}
                  onClick={() => setActiveClass(cls)}
                  className={`p-6 cursor-pointer transition-all ${
                    activeClass.id === cls.id ? "border-primary border-2 bg-primary/5" : "hover:shadow-lg"
                  }`}
                >
                  <h3 className="font-bold text-lg">{cls.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{cls.subject}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{cls.students.length} Students</span>
                    <Badge variant={activeClass.id === cls.id ? "default" : "secondary"}>{cls.level}</Badge>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Students in {activeClass.name}</h3>
              </div>

              {activeClass.students.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No students added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Roll No.</th>
                        <th className="text-left py-3 px-4 font-semibold">Attendance</th>
                        <th className="text-left py-3 px-4 font-semibold">Avg Marks</th>
                        <th className="text-left py-3 px-4 font-semibold">Next Exam</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeClass.students.map((student) => (
                        <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">{student.name}</td>
                          <td className="py-3 px-4">{student.roll}</td>
                          <td className="py-3 px-4">
                            <Badge variant={student.attendance >= 90 ? "default" : "secondary"}>
                              {student.attendance}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-semibold">{student.avgMarks}%</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(student.nextExam).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Edit2 size={14} /> Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {activeClass.students.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Today's Attendance ({new Date().toLocaleDateString()})</h3>
                <div className="space-y-4">
                  {activeClass.students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <span className="font-medium">{student.name}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Present
                        </Button>
                        <Button size="sm" variant="outline">
                          Absent
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6">
                  Submit Attendance
                  <span className="ml-2 text-xs">(BACKEND: POST /api/attendance)</span>
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Class</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Class Name (e.g., Class 8 Mathematics)"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <input
                  type="text"
                  placeholder="Subject (e.g., Mathematics)"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <input
                  type="text"
                  placeholder="Class Level (e.g., Class 8)"
                  value={newClass.level}
                  onChange={(e) => setNewClass({ ...newClass, level: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <Button onClick={handleAddClass} className="w-full">
                  Create Class
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
