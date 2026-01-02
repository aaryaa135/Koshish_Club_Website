"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, lang?: Language) => string
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.features": "What We Do",
    "nav.resources": "Resources",
    "nav.teachers": "Teachers",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "nav.teacher_login": "Teacher Login",
    "nav.student_portal": "Student Portal",
    "hero.title": "Quality Education, Zero Cost",
    "hero.desc": "Koshish Club provides free, high-quality education to students of all backgrounds.",
    "student.my_progress": "My Learning Journey",
    "student.milestones": "My Achievements",
    "student.resources": "My Study Materials",
    "coordinator.dashboard": "Coordinator Dashboard",
    "coordinator.manage_classes": "Manage Classes",
    "coordinator.analytics": "Analytics & Reports",
    "footer.about_us": "About Koshish Club",
    "footer.contact": "Contact Us",
    "footer.terms": "Terms of Service",
  },
  hi: {
    "nav.home": "होम",
    "nav.about": "परिचय",
    "nav.features": "हम क्या करते हैं",
    "nav.resources": "संसाधन",
    "nav.teachers": "शिक्षक",
    "nav.reviews": "समीक्षा",
    "nav.contact": "संपर्क करें",
    "nav.teacher_login": "शिक्षक लॉगिन",
    "nav.student_portal": "छात्र पोर्टल",
    "hero.title": "गुणवत्तापूर्ण शिक्षा, शून्य लागत",
    "hero.desc": "कोशिश क्लब सभी पृष्ठभूमि के छात्रों को मुफ्त, उच्च गुणवत्ता की शिक्षा प्रदान करता है।",
    "student.my_progress": "मेकी सीखने की यात्रा",
    "student.milestones": "मेरी उपलब्धियां",
    "student.resources": "मेकी अध्ययन सामग्री",
    "coordinator.dashboard": "समन्वयक डैशबोर्ड",
    "coordinator.manage_classes": "कक्षाएं प्रबंधित करें",
    "coordinator.analytics": "विश्लेषण और रिपोर्ट",
    "footer.about_us": "कोशिश क्लब के बारे में",
    "footer.contact": "हमसे संपर्क करें",
    "footer.terms": "सेवा की शर्तें",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string, lang?: Language): string => {
    const currentLang = lang || language
    return (translations[currentLang] as any)[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
