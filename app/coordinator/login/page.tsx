"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function CoordinatorLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("coordinator@example.com")
  const [password, setPassword] = useState("demo123")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // <BACKEND_CONNECTION>
    // Replace with actual backend API call:
    // const response = await fetch('/api/coordinator/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })
    // const data = await response.json()
    // if (data.success) {
    //   localStorage.setItem('coordinatorId', data.coordinatorId)
    //   localStorage.setItem('coordinatorToken', data.token)
    //   router.push('/coordinator/dashboard')
    // }

    try {
      localStorage.setItem("coordinatorEmail", email)
      localStorage.setItem("coordinatorId", "demo-coord-" + Math.random().toString(36).substr(2, 9))

      setTimeout(() => {
        setIsLoading(false)
        router.push("/coordinator/dashboard")
      }, 800)
    } catch (error) {
      setIsLoading(false)
      alert("Login failed. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 flex flex-col items-center justify-center p-4">
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
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">K</span>
            </div>
            <h1 className="text-2xl font-bold">Coordinator Portal</h1>
            <p className="text-muted-foreground">Manage classes & track progress</p>
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
                placeholder="coordinator@example.com"
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

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Logging in..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground">Demo: coordinator@example.com / demo123</p>
          </div>
        </div>
      </Card>
    </main>
  )
}
