# Koshish Club - Education Platform

A modern, child and adult-friendly educational platform that provides free quality education to students through dedicated teachers. This project implements both frontend and backend systems for managing classes, students, attendance, and academic progress.

## 🎯 What is Koshish Club?

**Koshish Club** is a community-driven educational initiative offering:
- Free classes for school kids (6-18 years)
- Evening classes taught by college student volunteers
- NCERT-aligned curriculum with personalized attention
- Experienced & passionate volunteer teachers
- Individual progress tracking & exam preparation
- A supportive learning community

## Project Overview

**Koshish Club** is a community-driven educational initiative offering:
- Free classes for college students
- Evening classes for school kids
- NCERT-aligned curriculum
- Experienced & passionate teachers
- Individual attention & progress tracking
- Exam & test preparation

## Features

### For Teachers
- **Authentication**: Login with email and password (saved for 30 days)
- **Class Management**: Create multiple classes with different subjects
- **Student Management**: Add/edit/remove students from classes
- **Attendance Tracking**: Mark daily attendance for all students
- **Progress Tracking**: Record marks, test scores, and academic performance
- **Exam Management**: Add school exam and test schedules for students

### For Students/Parents
- **Student Portal**: View personal academic information
- **Class Overview**: See enrolled classes with average marks
- **Attendance**: Track attendance percentage
- **Marks & Progress**: View test scores and overall performance
- **Exam Calendar**: See upcoming exams and test schedules
- **Performance Analytics**: Visual progress charts and analytics

### For Visitors
- **Home Page**: Club introduction and mission
- **About Section**: Club initiatives and vision
- **Resources Section**: Free study materials (NCERT, sample papers, etc.)
- **Teacher Showcase**: Information about available teachers
- **Reviews**: Student and parent testimonials
- **Contact Section**: Coordinator information and contact form

### For Coordinators
- **Coordinator Login**: Access admin dashboard
- **Class Management**: View and manage all classes
- **Student Management**: Monitor student enrollment and progress
- **Attendance Analytics**: Track attendance trends
- **Announcements**: Create and manage club announcements
- **Teacher Management**: Onboard and manage volunteer teachers
- **Reports & Analytics**: Generate club impact reports

## Frontend Structure

```
app/
├── layout.tsx                 # Root layout with metadata
├── globals.css               # Global styles with design tokens
├── page.tsx                  # Home page
├── teacher/
│   ├── login/
│   │   └── page.tsx         # Teacher login page
│   ├── register/
│   │   └── page.tsx         # Teacher registration page
│   └── dashboard/
│       └── page.tsx         # Teacher dashboard with class & student management
├── student/
│   └── page.tsx             # Student portal with marks and exam info
├── coordinator/
│   ├── login/
│   │   └── page.tsx         # Coordinator login page
│   └── dashboard/
│       └── page.tsx         # Coordinator dashboard with admin management
└── components/
    ├── navbar.tsx               # Navigation bar
    ├── footer.tsx               # Footer with links and social media
    ├── sections/
    │   ├── hero.tsx            # Hero section with CTA
    │   ├── about.tsx           # About Koshish Club
    │   ├── features.tsx        # What we do section
    │   ├── resources.tsx       # Study resources
    │   ├── teachers.tsx        # Teacher showcase
    │   ├── reviews.tsx         # Testimonials
    │   ├── contact.tsx         # Contact form and coordinators
    │   └── impact.tsx          # Impact stories section
    └── ui/                      # shadcn/ui components
```

## Design System

- **Primary Color**: Blue/Teal (Education-focused)
- **Secondary Color**: Teal accent
- **Neutrals**: Whites, light grays, dark grays, black
- **Typography**: Geist (sans-serif) font family
- **Design Tokens**: Tailwind CSS with custom color variables
- **Responsiveness**: Mobile-first design with Tailwind breakpoints

## Technology Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons

## Backend Connection Points

The following frontend features require backend implementation:

### 1. **Teacher Authentication** (`/teacher/login`)
**Endpoint Needed:** `POST /api/teacher/login`
```javascript
// Request body
{
  email: string,
  password: string
}

// Response
{
  success: boolean,
  teacher: {
    id: string,
    name: string,
    email: string,
    subject: string,
    classes: []
  },
  token: string,
  expiresIn: number (30 days in seconds)
}
```
**Storage:** Save auth token in HTTP-only cookie (for 30 days)
**Location:** `app/teacher/login/page.tsx` line ~50

---

### 2. **Teacher Registration** (`/teacher/register`)
**Endpoint Needed:** `POST /api/teacher/register`
```javascript
// Request body
{
  fullName: string,
  email: string,
  phone: string,
  subject: string,
  classes: string
}

// Response
{
  success: boolean,
  message: string,
  teacherId: string
}
```
**Location:** `app/teacher/register/page.tsx` line ~40

---

### 3. **Fetch Teacher Classes** (Teacher Dashboard)
**Endpoint Needed:** `GET /api/teacher/classes`
```javascript
// Headers: Authorization: Bearer {token}

// Response
{
  classes: [
    {
      id: string,
      name: string,
      subject: string,
      level: string,
      students: []
    }
  ]
}
```
**Location:** `app/teacher/dashboard/page.tsx` line ~20 (useState initialization)

---

### 4. **Create New Class** (Teacher Dashboard)
**Endpoint Needed:** `POST /api/teacher/classes`
```javascript
// Headers: Authorization: Bearer {token}
// Request body
{
  name: string,
  subject: string,
  level: string
}

// Response
{
  success: boolean,
  classId: string,
  class: Class
}
```
**Location:** `app/teacher/dashboard/page.tsx` line ~45 (handleAddClass function)

---

### 5. **Add Student to Class** (Teacher Dashboard)
**Endpoint Needed:** `POST /api/teacher/classes/{classId}/students`
```javascript
// Headers: Authorization: Bearer {token}
// Request body
{
  name: string,
  rollNo: number,
  schoolName: string,
  guardianName: string,
  guardianPhone: string
}

// Response
{
  success: boolean,
  studentId: string,
  student: Student
}
```
**Location:** `app/teacher/dashboard/page.tsx` line ~120 (Add Student form - to be implemented)

---

### 6. **Submit Attendance** (Teacher Dashboard)
**Endpoint Needed:** `POST /api/teacher/attendance`
```javascript
// Headers: Authorization: Bearer {token}
// Request body
{
  classId: string,
  date: string (YYYY-MM-DD),
  attendance: [
    {
      studentId: string,
      status: "present" | "absent"
    }
  ]
}

// Response
{
  success: boolean,
  attendanceId: string
}
```
**Location:** `app/teacher/dashboard/page.tsx` line ~190 (Submit Attendance button)

---

### 7. **Add Student Marks** (Teacher Dashboard - to be implemented)
**Endpoint Needed:** `POST /api/teacher/marks`
```javascript
// Headers: Authorization: Bearer {token}
// Request body
{
  studentId: string,
  classId: string,
  testName: string,
  marks: number,
  maxMarks: number,
  date: string
}

// Response
{
  success: boolean,
  markId: string
}
```
**New Feature:** Add marks submission form in teacher dashboard

---

### 8. **Add Exam/Test Schedule** (Teacher Dashboard - to be implemented)
**Endpoint Needed:** `POST /api/teacher/exams`
```javascript
// Headers: Authorization: Bearer {token}
// Request body
{
  classId: string,
  subject: string,
  examDate: string (YYYY-MM-DD),
  examTime: string (HH:MM),
  duration: string,
  examType: string
}

// Response
{
  success: boolean,
  examId: string
}
```
**New Feature:** Add exam schedule form in teacher dashboard

---

### 9. **Fetch Student Info** (Student Portal)
**Endpoint Needed:** `GET /api/student/{studentId}`
```javascript
// No authentication needed (or can be public)

// Response
{
  student: {
    id: string,
    name: string,
    rollNo: number,
    class: string,
    school: string,
    guardianName: string,
    guardianPhone: string
  }
}
```
**Location:** `app/student/page.tsx` line ~15

---

### 10. **Fetch Student Classes & Marks** (Student Portal)
**Endpoint Needed:** `GET /api/student/{studentId}/classes`
```javascript
// Response
{
  classes: [
    {
      id: string,
      name: string,
      teacher: string,
      attendance: number,
      avgMarks: number,
      marks: [
        {
          test: string,
          marks: number,
          maxMarks: number
        }
      ]
    }
  ]
}
```
**Location:** `app/student/page.tsx` line ~30

---

### 11. **Fetch Student Exams** (Student Portal)
**Endpoint Needed:** `GET /api/student/{studentId}/exams`
```javascript
// Response
{
  exams: [
    {
      id: string,
      subject: string,
      date: string (YYYY-MM-DD),
      time: string (HH:MM),
      duration: string,
      type: string
    }
  ]
}
```
**Location:** `app/student/page.tsx` line ~50

---

### 12. **Contact Form Submission** (Home Page)
**Endpoint Needed:** `POST /api/contact`
```javascript
// Request body
{
  name: string,
  email: string,
  message: string
}

// Response
{
  success: boolean,
  message: string
}
```
**Location:** `components/sections/contact.tsx` line ~65 (handleSubmit function)

---

### 13. **Coordinator Authentication** (`/coordinator/login`)
**Endpoint Needed:** `POST /api/coordinator/login`
```javascript
// Request body
{
  email: string,
  password: string
}

// Response
{
  success: boolean,
  coordinator: {
    id: string,
    name: string,
    email: string
  },
  token: string,
  expiresIn: number
}
```
**Storage:** Save auth token in HTTP-only cookie
**Location:** `app/coordinator/login/page.tsx` line ~50

---

### 14. **Fetch Coordinator Dashboard Data** (`/coordinator/dashboard`)
**Endpoint Needed:** `GET /api/coordinator/dashboard`
```javascript
// Headers: Authorization: Bearer {token}

// Response
{
  totalClasses: number,
  totalStudents: number,
  totalTeachers: number,
  attendanceStats: {
    overall: number,
    classes: [
      {
        className: string,
        attendancePercentage: number
      }
    ]
  },
  impactMetrics: {
    successStories: number,
    resourceUtilization: number
  }
}
```
**Location:** `app/coordinator/dashboard/page.tsx` line ~20 (useState initialization)

---

## Database Schema (Recommended)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type ENUM('teacher', 'student', 'admin'),
  created_at TIMESTAMP
);
```

### Teachers Table
```sql
CREATE TABLE teachers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  subject VARCHAR(100),
  classes_taught TEXT,
  created_at TIMESTAMP
);
```

### Classes Table
```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY,
  teacher_id UUID REFERENCES teachers(id),
  name VARCHAR(255),
  subject VARCHAR(100),
  level VARCHAR(50),
  created_at TIMESTAMP
);
```

### Students Table
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  roll_no INTEGER,
  school_name VARCHAR(255),
  guardian_name VARCHAR(255),
  guardian_phone VARCHAR(20),
  created_at TIMESTAMP
);
```

### Class_Students Table (Junction)
```sql
CREATE TABLE class_students (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  student_id UUID REFERENCES students(id),
  enrolled_at TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  class_id UUID REFERENCES classes(id),
  date DATE,
  status ENUM('present', 'absent'),
  recorded_at TIMESTAMP
);
```

### Marks Table
```sql
CREATE TABLE marks (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  class_id UUID REFERENCES classes(id),
  test_name VARCHAR(255),
  marks DECIMAL(5,2),
  max_marks DECIMAL(5,2),
  test_date DATE,
  created_at TIMESTAMP
);
```

### Exams Table
```sql
CREATE TABLE exams (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  subject VARCHAR(100),
  exam_date DATE,
  exam_time TIME,
  duration VARCHAR(50),
  exam_type VARCHAR(100),
  created_at TIMESTAMP
);
```

### Coordinator Table
```sql
CREATE TABLE coordinators (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP
);
```

## Authentication & Security

**Frontend:**
- Credentials saved in localStorage for 30 days (for demo purposes)
- Auth token stored in HTTP-only cookies (for production)
- Protected routes redirect to login if not authenticated

**Backend Requirements:**
- Hash passwords using bcrypt
- Implement JWT token-based authentication
- Set HTTP-only, Secure, SameSite cookies
- Implement proper error handling and validation
- Add rate limiting for login attempts
- Implement CORS properly

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd koshish-club
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in browser

### Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Port: 3000

## Future Enhancements

- Mobile app for students and teachers
- Video lessons and recorded classes
- Online tests and quizzes
- Parent notifications for progress updates
- Advanced analytics and reporting
- AI-powered study recommendations
- Integration with payment gateway for donations
- Multi-language support
- Offline mode support

## License

This project is open-source and available for educational purposes.

## Support

For issues, questions, or suggestions, contact the Koshish Club coordinators:
- **Rahul Sharma** (Coordinator): +91-9876543210
- **Neha Singh** (Academic Lead): +91-9876543211
- **Arjun Patel** (Student Coordinator): +91-9876543212

Email: contact@koshishclub.org

## Contributing

We welcome contributions! Please feel free to submit a Pull Request with:
- Bug fixes
- Feature enhancements
- Documentation improvements
- UI/UX improvements

---

Made with ❤️ by the Koshish Club Team
