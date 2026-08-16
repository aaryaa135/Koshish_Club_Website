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
  const [classes, setClasses] = useState([])
  const [activeClass, setActiveClass] = useState(null)
  const [showAddClass, setShowAddClass] = useState(false)
  const [newClass, setNewClass] = useState({ name: "", subject: "", level: "" })

  useEffect(() => {
    const teacherId = localStorage.getItem('teacherId')
    const teacherToken = localStorage.getItem('teacherToken')
    if (!teacherId || !teacherToken) { router.push('/teacher/login') }
    else { setTeacherEmail(localStorage.getItem('teacherEmail') || '') }
  }, [router])

  useEffect(() => { fetchClasses() }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/teacher/classes', { credentials: 'include' })
      const data = await response.json()
      if (response.ok) { setClasses(data.classes || []) }
    } catch (error) { console.error('Error fetching classes:', error) }
  }

  const handleAddClass = async () => {
    if (!newClass.name || !newClass.subject) return
    try {
      const response = await fetch('/api/teacher/classes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newClass.name, subject: newClass.subject, level: newClass.level || 'Class' })
      })
      const data = await response.json()
      if (response.ok) {
        setClasses([...classes, data.class])
        setActiveClass(data.class)
        setNewClass({ name: "", subject: "", level: "" })
        setShowAddClass(false)
      } else { alert(data.message || 'Failed to create class') }
    } catch (error) {
      console.error('Error creating class:', error)
      alert('Failed to create class. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('teacherEmail')
    localStorage.removeItem('teacherPassword')
    localStorage.removeItem('teacherId')
    localStorage.removeItem('teacherToken')
    router.push('/teacher/login')
  }

  const handleAddStudent = async (studentData) => {
    if (!activeClass) return
    try {
      const response = await fetch(`/api/teacher/classes/${activeClass.id}/students`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
      const data = await response.json()
      if (response.ok) {
        setClasses(classes.map(c => c.id === activeClass.id ? { ...c, students: [...(c.students || []), data.student] } : c))
        alert('Student added successfully!')
      } else { alert(data.message || 'Failed to add student') }
    } catch (error) {
      console.error('Error adding student:', error)
      alert('Failed to add student. Please try again.')
    }
  }

  const handleSubmitAttendance = async (formData) => {
    if (!activeClass) return
    try {
      const response = await fetch('/api/teacher/attendance', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: activeClass.id, studentId: formData.studentId, date: formData.date, status: formData.status })
      })
      const data = await response.json()
      if (response.ok) { alert('Attendance submitted successfully!'); fetchClasses() }
      else { alert(data.message || 'Failed to submit attendance') }
    } catch (error) {
      console.error('Error submitting attendance:', error)
      alert('Failed to submit attendance. Please try again.')
    }
  }

  const handleAddMarks = async (formData) => {
    if (!activeClass) return
    try {
      const response = await fetch('/api/teacher/marks', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: formData.studentId, classId: activeClass.id, testName: formData.testName, marksObtained: formData.marksObtained, maxMarks: formData.maxMarks })
      })
      const data = await response.json()
      if (response.ok) { alert('Marks recorded successfully!'); fetchClasses() }
      else { alert(data.message || 'Failed to record marks') }
    } catch (error) {
      console.error('Error adding marks:', error)
      alert('Failed to record marks. Please try again.')
    }
  }

  const handleDeleteClass = async (classId) => {
    if (!confirm('Are you sure you want to delete this class?')) return
    try {
      await fetch(`/api/teacher/classes/${classId}`, { method: 'DELETE', credentials: 'include' })
      setClasses(classes.filter(c => c.id !== classId))
      if (activeClass?.id === classId) setActiveClass(null)
    } catch (error) {
      console.error('Error deleting class:', error)
      alert('Failed to delete class')
    }
  }

  const handleEditClass = (cls) => { setActiveClass(cls); setShowAddClass(true); setNewClass({ name: cls.name, subject: cls.subject, level: cls.level }) }

  // Compute students table HTML
  function studentsTable() {
    if (!activeClass || !activeClass.students) { return null }
    if (activeClass.students.length === 0) { return <p className="text-muted-foreground text-center py-8">No students added yet</p> }
    const rows = activeClass.students.map((student) => (
      <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
        <td className="py-3 px-4">{student.name}</td>
        <td className="py-3 px-4">{student.roll_number}</td>
        <td className="py-3 px-4"><Badge variant={student.attendance >= 90 ? "default" : "secondary"}>{student.attendance}%</Badge></td>
        <td className="py-3 px-4 font-semibold">{student.avgMarks}%</td>
        <td className="py-3 px-4 text-muted-foreground">{new Date(student.nextExam).toLocaleDateString()}</td>
        <td className="py-3 px-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="gap-1"><Edit2 size={14} /> Edit</Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
          </div>
        </td>
      </tr>
    ))
    return (
      <div><table className="w-full text-sm"><tr className="border-b border-border"><th className="text-left py-3 px-4 font-semibold">Name</th><th className="text-left py-3 px-4 font-semibold">Roll No.</th><th className="text-left py-3 px-4 font-semibold">Attendance</th><th className="text-left py-3 px-4 font-semibold">Avg Marks</th><th className="text-left py-3 px-4 font-semibold">Next Exam</th><th className="text-left py-3 px-4 font-semibold">Actions</th></tr>{rows}</table></div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 text-background">
      <div className="bg-gradient-to-b from-primary via-accent to-secondary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2">
              <Home size={20} /><span className="hidden sm:inline">Koshish Club</span>
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
          <Card className="fun-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 p-6">
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"><BookOpen className="text-primary" size={24} /></div><div><p className="text-muted-foreground text-sm">Total Classes</p><p className="text-2xl font-bold">{classes.length}</p></div></div></Card>
          <Card className="fun-card bg-gradient-to-r from-accent/10 to-secondary/10 border-2 border-accent/30 p-6">
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"><Users className="text-accent" size={24} /></div><div><p className="text-muted-foreground text-sm">Total Students</p><p className="text-2xl font-bold">{classes.reduce((s, c) => s + (c.students?.length || 0), 0)}</p></div></div></Card>
          <Card className="fun-card bg-gradient-to-r from-secondary/10 to-tertiary/10 border-2 border-secondary/30 p-6">
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center"><TrendingUp className="text-secondary" size={24} /></div><div><p className="text-muted-foreground text-sm">Avg. Performance</p><p className="text-2xl font-bold">85%</p></div></div></Card>
        </div>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList><TabsTrigger value="classes">My Classes</TabsTrigger><TabsTrigger value="manage">Create Class</TabsTrigger></TabsList>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center"><h2 className="text-2xl font-bold">Your Classes</h2><Button onClick={() => setShowAddClass(true)} className="gap-2"><Plus size={18} /> Add Class</Button></div>
            <div className="grid md:grid-cols-3 gap-4">{classes.map((cls) => (
              <Card key={cls.id} onClick={() => setActiveClass(cls)} className="p-6 cursor-pointer transition-all fun-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 hover:shadow-lg"><h3 className="font-bold text-lg">{cls.name}</h3><p className="text-muted-foreground text-sm mb-4">{cls.subject}</p><div className="flex justify-between text-sm"><span className="text-muted-foreground">{cls.students?.length || 0} Students</span><Badge variant={activeClass?.id === cls.id ? "default" : "secondary"}>{cls.level}</Badge></div></Card>
            ))}</div>

            <Card className="fun-card p-6">
              <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Students in {activeClass?.name || ""}</h3></div>
              {activeClass && activeClass.students ? studentsTable() : (<p className="text-muted-foreground text-center py-8">No students added yet</p>)}
            </Card>

            <TabsContent value="manage" className="space-y-6"><Card className="fun-card p-6"><h3 className="text-xl font-bold mb-4">Add New Class</h3><div className="space-y-4"><input placeholder="Class Name (e.g., Class 8 Mathematics)" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background" /><input placeholder="Subject (e.g., Mathematics)" value={newClass.subject} onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })} className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background" /><input placeholder="Class Level (e.g., Class 8)" value={newClass.level} onChange={(e) => setNewClass({ ...newClass, level: e.target.value })} className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background" /><Button onClick={handleAddClass} className="w-full">Create Class</Button></div></Card></TabsContent>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}