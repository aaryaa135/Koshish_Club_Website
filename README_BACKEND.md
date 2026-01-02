# Koshish Club - Backend Requirements & API Documentation

## Overview
This frontend is fully functional with sample data. To make it production-ready, you need to implement the following backend services.

---

## Technology Stack Recommendations

- **Database**: PostgreSQL with Supabase or Neon
- **Authentication**: JWT tokens + HTTP-only cookies
- **API Framework**: Node.js (Express) or Python (FastAPI)
- **Password Hashing**: bcrypt
- **Real-time Updates**: WebSockets for live attendance marking (optional)

---

## Database Schema (SQL)

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('teacher', 'student', 'coordinator') NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Classes Table
```sql
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  teacher_id INT NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  level VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Students Table
```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  class_id INT NOT NULL REFERENCES classes(id),
  roll_number INT,
  school_name VARCHAR(255),
  guardian_name VARCHAR(255),
  guardian_phone VARCHAR(20),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id),
  class_id INT NOT NULL REFERENCES classes(id),
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'leave') DEFAULT 'absent',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, class_id, date)
);
```

### Marks & Assessment Table
```sql
CREATE TABLE assessments (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id),
  class_id INT NOT NULL REFERENCES classes(id),
  test_name VARCHAR(255) NOT NULL,
  marks_obtained INT NOT NULL,
  max_marks INT NOT NULL DEFAULT 100,
  teacher_comment TEXT,
  assessment_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Exams Table
```sql
CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  class_id INT NOT NULL REFERENCES classes(id),
  subject VARCHAR(255) NOT NULL,
  exam_date DATE NOT NULL,
  exam_time TIME NOT NULL,
  duration_minutes INT,
  exam_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Milestones Table
```sql
CREATE TABLE milestones (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id),
  milestone_title VARCHAR(255) NOT NULL,
  achieved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### 1. Authentication

#### POST `/api/auth/teacher/register`
- **Body**: `{ fullName, email, phone, subject, classes }`
- **Response**: `{ userId, email, token }`
- **Location in Frontend**: `/app/teacher/register/page.tsx` - Line "handleSubmit"

#### POST `/api/auth/teacher/login`
- **Body**: `{ email, password }`
- **Response**: `{ userId, email, token, expiresIn }`
- **Location in Frontend**: `/app/teacher/login/page.tsx` - Line "handleLogin"

#### POST `/api/auth/coordinator/login`
- **Body**: `{ email, password }`
- **Response**: `{ coordinatorId, email, token }`
- **Location in Frontend**: `/app/coordinator/login/page.tsx` - Line "handleLogin"

#### POST `/api/auth/logout`
- **Body**: `{ token }`
- **Response**: `{ success: true }`

---

### 2. Teacher APIs

#### GET `/api/teacher/:teacherId/classes`
- **Response**: Array of classes with students count
- **Location**: `/app/teacher/dashboard/page.tsx` - Loads classes list

#### POST `/api/teacher/:teacherId/classes`
- **Body**: `{ name, subject, level }`
- **Response**: `{ classId, name, subject }`
- **Location**: Teacher Dashboard - "Add Class" button

#### POST `/api/teacher/:teacherId/classes/:classId/students`
- **Body**: `{ studentName, rollNumber, schoolName, guardianName, guardianPhone }`
- **Response**: `{ studentId, classId, name }`
- **Location**: Teacher Dashboard - "Add Student" button

#### GET `/api/teacher/:teacherId/classes/:classId/attendance?date=YYYY-MM-DD`
- **Response**: `[{ studentId, name, status }]`
- **Location**: Teacher Dashboard - "Today's Attendance" section

#### POST `/api/teacher/:teacherId/classes/:classId/attendance`
- **Body**: `{ date, attendance: [{ studentId, status }] }`
- **Response**: `{ success: true, recordedCount }`
- **Location**: Teacher Dashboard - "Submit Attendance" button

#### POST `/api/teacher/:teacherId/assessments`
- **Body**: `{ studentId, classId, testName, marksObtained, maxMarks, teacherComment, assessmentDate }`
- **Response**: `{ assessmentId, success: true }`
- **Location**: Teacher Dashboard - "Record Marks" section

#### POST `/api/teacher/:teacherId/students/:studentId/notes`
- **Body**: `{ privateNote, updatedAt }`
- **Response**: `{ noteId, success: true }`
- **Location**: Teacher Dashboard - Private notes per student (future feature)

---

### 3. Student APIs

#### GET `/api/student/:studentId/profile`
- **Response**: `{ studentId, name, class, school, guardianName, guardianPhone }`
- **Location**: `/app/student/page.tsx` - Student info card

#### GET `/api/student/:studentId/classes`
- **Response**: Array of enrolled classes with latest marks
- **Location**: Student Portal - "My Classes" tab

#### GET `/api/student/:studentId/assessments`
- **Response**: `[{ testName, marksObtained, maxMarks, teacherComment, date }]`
- **Location**: Student Portal - Test results in classes

#### GET `/api/student/:studentId/exams`
- **Response**: `[{ subject, examDate, examTime, duration, examType }]`
- **Location**: Student Portal - "Upcoming Tests" tab

#### GET `/api/student/:studentId/milestones`
- **Response**: `[{ title, achievedAt, classId }]`
- **Location**: Student Portal - "Achievements" tab

#### POST `/api/student/:studentId/milestones/unlock`
- **Body**: `{ milestoneTitle, classId }`
- **Response**: `{ milestoneId, unlockedAt }`
- **Backend Trigger**: When student marks >= 80%, or 100% attendance, etc.

#### GET `/api/student/:studentId/resources`
- **Response**: `[{ resourceTitle, type, link, subject }]`
- **Location**: Student Portal - Resources section (future enhancement)

---

### 4. Coordinator APIs

#### GET `/api/coordinator/dashboard/stats`
- **Response**: `{ activeClasses, totalStudents, avgAttendance, reportCount }`
- **Location**: `/app/coordinator/dashboard/page.tsx` - Key metrics cards

#### GET `/api/coordinator/classes?limit=20`
- **Response**: Array of all classes with student count and attendance
- **Location**: Coordinator Dashboard - "All Classes" tab

#### GET `/api/coordinator/attendance-trends?weeks=4`
- **Response**: `[{ week, attendancePercentage }]`
- **Location**: Coordinator Dashboard - "Analytics" tab

#### POST `/api/coordinator/announcements`
- **Body**: `{ title, description, postedBy }`
- **Response**: `{ announcementId, success: true }`
- **Location**: Coordinator Dashboard - "Post Announcement" section

#### GET `/api/coordinator/announcements`
- **Response**: Array of all announcements with dates
- **Location**: Coordinator Dashboard - Announcements list

#### GET `/api/coordinator/reports/performance`
- **Response**: Detailed performance metrics by class, teacher, subject
- **Backend Info**: Complex aggregation needed
- **Location**: Coordinator Dashboard - Analytics tab (future)

---

### 5. Contact Form API

#### POST `/api/contact`
- **Body**: `{ name, email, phone, subject, message }`
- **Response**: `{ messageId, success: true, confirmationEmail: sent }`
- **Location**: `/components/sections/contact.tsx` - Contact form submission

---

## Authentication Flow

1. **Login**: User submits email + password
2. **Backend**: Hash password with bcrypt, verify against DB
3. **Response**: Return JWT token + refresh token
4. **Frontend**: Store JWT in httpOnly cookie (secure)
5. **Subsequent Requests**: Include token in Authorization header
6. **Token Expiry**: Use refresh token to get new JWT

---

## Key Features to Implement

### Low-Pressure Progress Tracking
- Store marks + comments (not just numeric scores)
- Track milestones: badges for achievements
- No ranking or comparison systems
- Regular progress updates for parents

### Real-time Attendance
- Mark attendance quickly with date filtering
- Auto-calculate attendance percentage
- Sync across all classes a teacher teaches

### Student Milestones
- Unlock badges for: first perfect score, 100% attendance week, test improvement, etc.
- Show to students for motivation
- Include achievement dates in response

### Language Support (English/Hindi)
- Backend: Store labels and descriptions in default language
- Frontend: useLanguage context handles display
- **No DB changes needed** - translation on frontend using context

### Coordinator Admin Features
- Dashboard with key metrics
- Manage class schedules and teacher assignments
- View performance trends
- Post announcements
- Monitor attendance patterns
- Export reports (CSV/PDF)

---

## Security Checklist

- [ ] Use bcrypt (min 10 rounds) for password hashing
- [ ] Validate all inputs on backend (SQL injection prevention)
- [ ] Use parameterized queries for all SQL
- [ ] Implement rate limiting for auth endpoints
- [ ] CORS configuration (only allow frontend domain)
- [ ] HTTPS only for production
- [ ] HTTP-only cookies for tokens (no XSS access)
- [ ] CSRF tokens for state-changing operations
- [ ] Row-level security if using Supabase
- [ ] Sanitize user inputs before storing

---

## Backend Integration Points in Frontend

Search for `<BACKEND_CONNECTION>` comments in:
- `/app/teacher/login/page.tsx` - Teacher authentication
- `/app/teacher/register/page.tsx` - Teacher registration
- `/app/teacher/dashboard/page.tsx` - Class & student management, attendance
- `/app/student/page.tsx` - Student data fetching (partially)
- `/app/coordinator/login/page.tsx` - Coordinator authentication
- `/app/coordinator/dashboard/page.tsx` - Dashboard data & announcements
- `/components/sections/contact.tsx` - Contact form submission

---

## Development Timeline (Rough Estimate)

1. **Database Setup**: 1-2 days
2. **Auth System**: 2-3 days
3. **Teacher APIs**: 3-4 days
4. **Student APIs**: 2-3 days
5. **Coordinator APIs**: 2-3 days
6. **Testing & Debugging**: 2-3 days

**Total**: ~2 weeks for a basic working backend

---

## Deployment Recommendations

- **Database**: Supabase (has built-in auth) OR Neon + custom auth
- **Backend**: Vercel (Node.js serverless) OR Railway
- **Frontend**: Already Vercel-ready (Next.js)
- **Storage**: Vercel Blob for documents/resources

---

## Future Enhancements

- WhatsApp/SMS notifications for attendance & exams
- Mobile app version
- Video lesson integration
- Assignment submission system
- Parent-teacher messaging
- Student portfolio/e-resume
- Advanced analytics dashboard
- Integration with school management systems

---

**Questions?** Contact the development team or refer to the inline frontend comments marked with `<BACKEND_CONNECTION>`.
