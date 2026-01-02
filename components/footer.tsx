import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground">
                K
              </div>
              <span>Koshish Club</span>
            </Link>
            <p className="text-sm opacity-80">
              Providing quality, free education to every student. Because learning is a right, not a privilege.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#impact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link href="#resources" className="opacity-80 hover:opacity-100 transition-opacity">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Everyone */}
          <div>
            <h4 className="font-bold mb-4">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/student" className="opacity-80 hover:opacity-100 transition-opacity">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/teacher/login" className="opacity-80 hover:opacity-100 transition-opacity">
                  Teacher Login
                </Link>
              </li>
              <li>
                <Link href="/coordinator/login" className="opacity-80 hover:opacity-100 transition-opacity">
                  Coordinator
                </Link>
              </li>
              <li>
                <Link href="/teacher/register" className="opacity-80 hover:opacity-100 transition-opacity">
                  Join as Teacher
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity p-2 bg-background/20 rounded-lg">
                <Facebook size={20} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity p-2 bg-background/20 rounded-lg">
                <Twitter size={20} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity p-2 bg-background/20 rounded-lg">
                <Instagram size={20} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity p-2 bg-background/20 rounded-lg">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm opacity-75">
            <p>&copy; {currentYear} Koshish Club. All rights reserved.</p>
            <p className="text-center">Made with love for education</p>
            <p className="text-right">
              <Link href="#" className="hover:opacity-100">
                Privacy
              </Link>
              {" | "}
              <Link href="#" className="hover:opacity-100">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
