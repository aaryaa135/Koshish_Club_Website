"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function TeacherLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("teacher@example.com")
  const [password, setPassword] = useState("demo123")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // <BACKEND_CONNECTION>
    // Replace this demo logic with actual backend call:
    // const response = await fetch('/api/teacher/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })
    // const data = await response.json()
    // if (data.success) {
    //   localStorage.setItem('teacherId', data.teacherId)
    //   localStorage.setItem('teacherEmail', email)
    //   localStorage.setItem('teacherToken', data.token)
    //   if (rememberMe) localStorage.setItem('teacherRemember', email)
    //   router.push('/teacher/dashboard')
    // }

    // Demo: Save credentials and redirect
    try {
      localStorage.setItem("teacherEmail", email)
      localStorage.setItem("teacherPassword", password)
      localStorage.setItem("teacherId", "demo-teacher-" + Math.random().toString(36).substr(2, 9))

      if (rememberMe) {
        localStorage.setItem("teacherRemember", email)
      }

      setTimeout(() => {
        setIsLoading(false)
        router.push("/teacher/dashboard")
      }, 800)
    } catch (error) {
      setIsLoading(false)
      alert("Login failed. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <Card className="w-full max-w-md">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
            </div>
            <h1 className="text-2xl font-bold">Teacher Portal</h1>
            <p className="text-muted-foreground">Login to manage your classes</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder="teacher@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Logging in..." : "Login to Dashboard"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
            <Link href="/teacher/register">
              <Button variant="outline" className="w-full bg-transparent">
                Register as Teacher
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-4 max-w-md">Demo: teacher@example.com / demo123</p>
    </main>
  )
}
