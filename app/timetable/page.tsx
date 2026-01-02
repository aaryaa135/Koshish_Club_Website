"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Edit2, Save, X } from "lucide-react"

export default function TimetablePage() {
  const router = useRouter()
  const [isCoordinator, setIsCoordinator] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [timetableData, setTimetableData] = useState([
    {
      day: "Monday",
      slots: [
        { time: "10:00 - 11:00", class: "Class 8 Math", teacher: "Priya Sharma", subject: "Mathematics" },
        { time: "11:15 - 12:15", class: "Class 10 Science", teacher: "Rahul Verma", subject: "Science" },
        { time: "2:00 - 3:00", class: "Class 9 English", teacher: "Neha Gupta", subject: "English" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "10:00 - 11:00", class: "Class 9 Science", teacher: "Rahul Verma", subject: "Science" },
        { time: "11:15 - 12:15", class: "Class 8 English", teacher: "Neha Gupta", subject: "English" },
        { time: "2:00 - 3:00", class: "Class 10 Math", teacher: "Priya Sharma", subject: "Mathematics" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "10:00 - 11:00", class: "Class 8 Math", teacher: "Priya Sharma", subject: "Mathematics" },
        { time: "11:15 - 12:15", class: "Class 9 English", teacher: "Neha Gupta", subject: "English" },
        { time: "2:00 - 3:00", class: "Class 10 Science", teacher: "Rahul Verma", subject: "Science" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "10:00 - 11:00", class: "Class 10 Math", teacher: "Priya Sharma", subject: "Mathematics" },
        { time: "11:15 - 12:15", class: "Class 8 Science", teacher: "Rahul Verma", subject: "Science" },
        { time: "2:00 - 3:00", class: "Class 9 Math", teacher: "Priya Sharma", subject: "Mathematics" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "10:00 - 11:00", class: "Class 9 Math", teacher: "Priya Sharma", subject: "Mathematics" },
        { time: "11:15 - 12:15", class: "Class 10 English", teacher: "Neha Gupta", subject: "English" },
        { time: "2:00 - 3:00", class: "Class 8 Science", teacher: "Rahul Verma", subject: "Science" },
      ],
    },
  ])

  const [editingSlot, setEditingSlot] = useState(null)

  useEffect(() => {
    // Check if user is coordinator
    const coordEmail = localStorage.getItem("coordinatorEmail")
    setIsCoordinator(!!coordEmail)

    // Load timetable from localStorage if available
    const savedTimetable = localStorage.getItem("koshishTimetable")
    if (savedTimetable) {
      try {
        setTimetableData(JSON.parse(savedTimetable))
      } catch (e) {
        console.error("Error loading timetable:", e)
      }
    }
  }, [])

  const handleSaveTimetable = () => {
    localStorage.setItem("koshishTimetable", JSON.stringify(timetableData))
    setIsEditMode(false)
  }

  const handleSlotChange = (dayIndex, slotIndex, field, value) => {
    const newTimetable = [...timetableData]
    newTimetable[dayIndex].slots[slotIndex][field] = value
    setTimetableData(newTimetable)
  }

  const handleAddSlot = (dayIndex) => {
    const newTimetable = [...timetableData]
    newTimetable[dayIndex].slots.push({
      time: "3:15 - 4:15",
      class: "Class Name",
      teacher: "Teacher Name",
      subject: "Subject",
    })
    setTimetableData(newTimetable)
  }

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const newTimetable = [...timetableData]
    newTimetable[dayIndex].slots.splice(slotIndex, 1)
    setTimetableData(newTimetable)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2">
              <Home size={24} />
              <span className="hidden sm:inline text-xl">Koshish Club Timetable</span>
            </Link>
          </div>
          {isCoordinator && (
            <Button
              onClick={() => (isEditMode ? handleSaveTimetable() : setIsEditMode(true))}
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              {isEditMode ? (
                <>
                  <Save size={18} /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={18} /> Edit Timetable
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCoordinator && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl">
            <p className="text-blue-900 font-semibold flex items-center gap-2">
              👤 Coordinator Mode: You can edit the timetable. Click "Edit Timetable" to make changes.
            </p>
          </Card>
        )}

        {!isCoordinator && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl">
            <p className="text-green-900 font-semibold flex items-center gap-2">
              👁️ View Mode: You can see the timetable but cannot edit it.
            </p>
          </Card>
        )}

        <div className="grid gap-6">
          {timetableData.map((dayData, dayIndex) => (
            <Card
              key={dayIndex}
              className="p-6 bg-white border-2 border-primary/20 rounded-3xl hover:border-primary/50 transition-colors shadow-lg"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-primary mb-2">{dayData.day} 📚</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </div>

              <div className="grid gap-4">
                {dayData.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 border-2 border-purple-200 rounded-2xl hover:shadow-md transition-all"
                  >
                    {isEditMode ? (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-primary mb-2">⏰ Time</label>
                            <input
                              type="text"
                              value={slot.time}
                              onChange={(e) => handleSlotChange(dayIndex, slotIndex, "time", e.target.value)}
                              className="w-full px-4 py-2 border-2 border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                              placeholder="e.g., 10:00 - 11:00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-primary mb-2">📖 Class</label>
                            <input
                              type="text"
                              value={slot.class}
                              onChange={(e) => handleSlotChange(dayIndex, slotIndex, "class", e.target.value)}
                              className="w-full px-4 py-2 border-2 border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                              placeholder="e.g., Class 8 Math"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-primary mb-2">👨‍🏫 Teacher Name</label>
                            <input
                              type="text"
                              value={slot.teacher}
                              onChange={(e) => handleSlotChange(dayIndex, slotIndex, "teacher", e.target.value)}
                              className="w-full px-4 py-2 border-2 border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                              placeholder="e.g., Priya Sharma"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-primary mb-2">📚 Subject</label>
                            <input
                              type="text"
                              value={slot.subject}
                              onChange={(e) => handleSlotChange(dayIndex, slotIndex, "subject", e.target.value)}
                              className="w-full px-4 py-2 border-2 border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                              placeholder="e.g., Mathematics"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                          >
                            <X size={16} /> Remove Slot
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="grid md:grid-cols-4 gap-6">
                            <div>
                              <p className="text-xs font-bold text-primary/60 uppercase tracking-wider">Time</p>
                              <p className="text-lg font-bold text-primary">⏰ {slot.time}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-accent/60 uppercase tracking-wider">Class</p>
                              <p className="text-lg font-bold text-accent">📖 {slot.class}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-secondary/60 uppercase tracking-wider">Teacher</p>
                              <p className="text-lg font-bold text-secondary">👨‍🏫 {slot.teacher}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary/60 uppercase tracking-wider">Subject</p>
                              <p className="text-lg font-bold text-primary">📚 {slot.subject}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {isEditMode && (
                <Button
                  onClick={() => handleAddSlot(dayIndex)}
                  variant="outline"
                  className="w-full mt-4 gap-2 border-2 border-dashed border-primary/50 hover:border-primary"
                >
                  + Add Time Slot
                </Button>
              )}
            </Card>
          ))}
        </div>

        {isEditMode && (
          <div className="flex gap-4 mt-8 justify-center">
            <Button
              onClick={handleSaveTimetable}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-accent text-white"
            >
              <Save size={20} /> Save All Changes
            </Button>
            <Button onClick={() => setIsEditMode(false)} size="lg" variant="outline" className="gap-2 border-2">
              <X size={20} /> Cancel
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
