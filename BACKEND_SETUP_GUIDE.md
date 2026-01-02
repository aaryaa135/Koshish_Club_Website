# Koshish Club - Backend Setup Guide

## Quick Start for Handoff

This guide is designed for someone taking over the backend implementation. All you need to do is follow these steps.

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Supabase/Neon)
- Basic understanding of Express.js/Node APIs

### Quick Setup (30 minutes)

```bash
# 1. Create backend folder
mkdir koshish-backend
cd koshish-backend

# 2. Initialize project
npm init -y
npm install express cors dotenv pg bcryptjs jsonwebtoken

# 3. Create .env file with:
DATABASE_URL=postgresql://user:password@localhost:5432/koshish
JWT_SECRET=your_secret_key_here_make_it_strong
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Database Schema

Run these SQL commands to set up your database:

```sql
-- Users table (Teachers & Coordinators)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) NOT NULL, -- 'teacher' or 'coordinator'
  phone VARCHAR(20),
  subject VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  level VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  class_id INTEGER NOT NULL REFERENCES classes(id),
  roll_number INTEGER,
  school_name VARCHAR(255),
  guardian_name VARCHAR(255),
  guardian_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  class_id INTEGER NOT NULL REFERENCES classes(id),
  date DATE NOT NULL,
  status VARCHAR(20), -- 'present' or 'absent'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Marks table
CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  class_id INTEGER NOT NULL REFERENCES classes(id),
  test_name VARCHAR(255),
  marks_obtained DECIMAL(5,2),
  max_marks DECIMAL(5,2),
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exams table
CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  subject VARCHAR(100),
  exam_date DATE,
  exam_time TIME,
  duration VARCHAR(50),
  exam_type VARCHAR(100),
  prep_status INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements table
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  coordinator_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints to Implement

### 1. Authentication Endpoints

**POST /api/auth/teacher-register**
- Body: `{ email, password, name, phone, subject }`
- Response: `{ success: true, userId, token }`
- Backend: Hash password with bcrypt, create user, return JWT token

**POST /api/auth/teacher-login**
- Body: `{ email, password }`
- Response: `{ success: true, userId, token }`
- Backend: Verify password, return JWT token in `Authorization: Bearer <token>`

**POST /api/auth/coordinator-login**
- Body: `{ email, password }`
- Response: `{ success: true, coordinatorId, token }`
- Backend: Verify role is 'coordinator'

---

### 2. Teacher Endpoints

**GET /api/teacher/classes** (Protected - requires teacher token)
- Response: `{ classes: [...] }`
- Backend: Return classes created by logged-in teacher

**POST /api/teacher/classes** (Protected)
- Body: `{ name, subject, level }`
- Response: `{ id, name, subject, level }`
- Backend: Create new class, assign to teacher

**POST /api/teacher/classes/:classId/students** (Protected)
- Body: `{ name, roll_number, school_name, guardian_name, guardian_phone }`
- Response: `{ id, name, roll_number }`
- Backend: Add student to class

**GET /api/teacher/classes/:classId/students** (Protected)
- Response: `{ students: [...] }`
- Backend: Get all students in class with attendance/marks

**POST /api/teacher/attendance** (Protected)
- Body: `{ classId, studentId, date, status }`
- Response: `{ success: true, attendanceId }`
- Backend: Record attendance

**POST /api/teacher/marks** (Protected)
- Body: `{ studentId, classId, testName, marksObtained, maxMarks, comments }`
- Response: `{ id, marksObtained }`
- Backend: Add marks and comments for student

---

### 3. Student Endpoints

**GET /api/student/profile/:studentId**
- Response: `{ name, class, school, guardian_name, guardian_phone }`
- Backend: Get student info

**GET /api/student/:studentId/classes**
- Response: `{ classes: [{name, teacher, attendance, marks: [...], avgMarks}] }`
- Backend: Get enrolled classes with marks

**GET /api/student/:studentId/exams**
- Response: `{ exams: [{subject, date, time, duration, type, prepStatus}] }`
- Backend: Get upcoming exams

**GET /api/student/:studentId/progress**
- Response: `{ avgMarks, attendance, milestones: [...] }`
- Backend: Calculate overall progress

---

### 4. Coordinator Endpoints

**GET /api/coordinator/classes** (Protected - coordinator token)
- Response: `{ classes: [{name, teacher, students_count, attendance_rate}] }`
- Backend: Get all classes system-wide

**GET /api/coordinator/stats**
- Response: `{ total_classes, total_students, avg_attendance }`
- Backend: Calculate system-wide statistics

**POST /api/coordinator/announcements**
- Body: `{ title, description }`
- Response: `{ id, title }`
- Backend: Create announcement

**GET /api/coordinator/announcements**
- Response: `{ announcements: [...] }`
- Backend: Get all announcements

**GET /api/coordinator/analytics**
- Response: `{ attendance_trends, student_performance, teacher_metrics }`
- Backend: Return analytics data

---

### 5. Contact Form Endpoint

**POST /api/contact**
- Body: `{ name, email, phone, message }`
- Response: `{ success: true, message: "We'll get back to you soon" }`
- Backend: Save to database or send email

---

## Implementation Priority

1. **Week 1:** Auth endpoints + Database
2. **Week 2:** Teacher CRUD endpoints + Attendance
3. **Week 3:** Marks + Student view endpoints
4. **Week 4:** Coordinator endpoints + Analytics

---

## Environment Variables Your Frontend Needs

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Koshish Club
```

Frontend will make all API calls to `${NEXT_PUBLIC_API_URL}/api/...`

---

## Frontend Integration Points

All API calls in frontend are marked with `<BACKEND_CONNECTION>` comments.

**Key files to update in frontend:**
- `app/teacher/login/page.tsx` - Line ~38: Replace fetch call
- `app/teacher/dashboard/page.tsx` - Line ~84: Fetch classes, POST attendance
- `app/student/page.tsx` - Line ~50: Fetch student data
- `app/coordinator/dashboard/page.tsx` - Line ~65: Fetch stats

---

## Testing Checklist

- [ ] Login endpoint returns JWT token
- [ ] Token persists in localStorage
- [ ] Logout clears token
- [ ] Protected routes redirect if no token
- [ ] Can create class and add students
- [ ] Attendance recording works
- [ ] Marks display correctly
- [ ] Student can view their progress
- [ ] Coordinator sees all classes

---

## Deployment

- Use Vercel for frontend (already set up)
- Use Railway, Render, or Heroku for backend
- Set DATABASE_URL and JWT_SECRET in deployment environment variables
- Ensure CORS allows frontend domain

---

## Questions?

Refer to individual API endpoint comments for more details. Each endpoint has specific requirements for:
- Authentication method
- Request body format
- Response format
- Error handling

Good luck!
