"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-primary/10 via-accent/5 to-secondary/5 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2 border-primary/20 shadow-lg fun-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Fun & Colorful */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              K
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Koshish
              </span>
              <p className="text-xs text-muted-foreground">Learning is Fun!</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="/#about"
              className="relative group text-sm font-semibold hover:text-primary hover:scale-110 transition-all"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all"></span>
            </a>
            <a
              href="/#features"
              className="relative group text-sm font-semibold hover:text-primary hover:scale-110 transition-all"
            >
              What We Do
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all"></span>
            </a>
            <a
              href="/#resources"
              className="relative group text-sm font-semibold hover:text-primary hover:scale-110 transition-all"
            >
              Resources
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all"></span>
            </a>
            <a
              href="/#impact"
              className="relative group text-sm font-semibold hover:text-primary hover:scale-110 transition-all"
            >
              Impact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all"></span>
            </a>
            <a
              href="/#contact"
              className="relative group text-sm font-semibold hover:text-primary hover:scale-110 transition-all"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all"></span>
            </a>
            <a
              href="/timetable"
              className="relative group text-sm font-semibold hover:text-primary hover:scale-110 transition-all"
            >
              📅 Timetable
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all"></span>
            </a>
          </div>

          {/* Auth Dropdown - Fun & Colorful */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="fun-button bg-gradient-to-r from-primary to-secondary text-white border-0 hidden sm:block">
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-2xl fun-card">
                <DropdownMenuItem asChild>
                  <Link href="/teacher/login" className="cursor-pointer text-base font-semibold block py-2 px-4 hover:bg-primary/10 transition-colors">
                    👨‍🏫 Teacher Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/coordinator/login" className="cursor-pointer text-base font-semibold block py-2 px-4 hover:bg-primary/10 transition-colors">
                    📋 Coordinator Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/student" className="cursor-pointer text-base font-semibold block py-2 px-4 hover:bg-primary/10 transition-colors">
                    👧 Student Portal
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t-2 border-primary/20 space-y-2">
            <a
              href="/#about"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              About
            </a>
            <a
              href="/#features"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              What We Do
            </a>
            <a
              href="/#resources"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              Resources
            </a>
            <a
              href="/#impact"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              Impact
            </a>
            <a
              href="/#contact"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              Contact
            </a>
            <Link
              href="/timetable"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              📅 Timetable
            </Link>
            <hr className="my-2 border-primary/20" />
            <Link
              href="/teacher/login"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              👨‍🏫 Teacher Login
            </Link>
            <Link
              href="/coordinator/login"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              📋 Coordinator Login
            </Link>
            <Link
              href="/student"
              className="block px-4 py-3 text-sm font-semibold hover:bg-primary/10 rounded-2xl transition-colors fun-shadow"
            >
              👧 Student Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
