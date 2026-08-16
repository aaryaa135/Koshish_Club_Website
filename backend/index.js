const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

/**
 * Helper: Generate JWT token
 */
const generateToken = (id, role, email) => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

/**
 * Helper: Hash password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Helper: Compare password
 */
const comparePassword = async (candidate, hash) => {
  return bcrypt.compare(candidate, hash);
};

/**
 * Middleware: Authenticate JWT token from cookie
 */
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware: Authenticate JWT from header
 */
const authHeader = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * GET / - Health check
 */
app.get('/', (req, res) => {
  res.json({ message: 'Koshish Club API is running' });
});

/**
 * POST /api/auth/teacher-register
 * Register a new teacher
 */
app.post('/api/auth/teacher-register', async (req, res) => {
  try {
    const { email, password, name, phone, subject } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hashedPassword = await hashPassword(password);
    
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, phone, subject, created_at)
       VALUES ($1, $2, $3, 'teacher', $4, $5, CURRENT_TIMESTAMP)
       RETURNING id, email, name, role, phone, subject`,
      [email, hashedPassword, name, phone, subject]
    );

    const token = generateToken(result.rows[0].id, 'teacher', result.rows[0].email);
    
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(201).json({
      success: true,
      userId: result.rows[0].id,
      token
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    // Check if email already exists
    const emailExists = await pool.query('SELECT id FROM users WHERE email = $1', [req.body.email]);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
});

/**
 * POST /api/auth/teacher-login
 * Teacher login
 */
app.post('/api/auth/teacher-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'teacher']);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, 'teacher', user.email);
    
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      userId: user.id,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        subject: user.subject
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

/**
 * POST /api/auth/coordinator-login
 * Coordinator login
 */
app.post('/api/auth/coordinator-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'coordinator']);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, 'coordinator', user.email);
    
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      userId: user.id,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Coordinator login error:', error.message);
    res.status(500).json({ message: 'Server error during coordinator login' });
  }
});

/**
 * GET /api/teacher/classes (Protected)
 * Get all classes for logged-in teacher
 */
app.get('/api/teacher/classes', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.subject, c.level,
              COUNT(cs.student_id) as students_count
       FROM classes c
       LEFT JOIN class_students cs ON c.id = cs.class_id
       WHERE c.teacher_id = $1
       GROUP BY c.id`,
      [req.user.id]
    );
    
    res.json({ classes: result.rows });
  } catch (error) {
    console.error('Error fetching classes:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/teacher/classes (Protected)
 * Create a new class
 */
app.post('/api/teacher/classes', auth, async (req, res) => {
  try {
    const { name, subject, level } = req.body;
    if (!name || !subject) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO classes (teacher_id, name, subject, level, created_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
       RETURNING id, name, subject, level`,
      [req.user.id, name, subject, level || 'Class']
    );
    
    res.json({
      success: true,
      classId: result.rows[0].id,
      class: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating class:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/teacher/classes/:classId/students (Protected)
 * Add student to class
 */
app.post('/api/teacher/classes/:classId/students', auth, async (req, res) => {
  try {
    const { classId } = req.params;
    const { name, roll_number, school_name, guardian_name, guardian_phone } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Student name is required' });
    }

    const result = await pool.query(
      `INSERT INTO students (name, class_id, roll_number, school_name, guardian_name, guardian_phone, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
       RETURNING id, name, roll_number, class_id`,
      [name, classId, roll_number || 0, school_name || '', guardian_name || '', guardian_phone || '']
    );
    
    // Add student to class-students junction
    await pool.query(
      `INSERT INTO class_students (class_id, student_id, enrolled_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [classId, result.rows[0].id]
    );
    
    res.json({
      success: true,
      studentId: result.rows[0].id,
      student: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        roll_number: result.rows[0].roll_number
      }
    });
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/classes/:classId/students (Protected)
 * Get students in a class
 */
app.get('/api/teacher/classes/:classId/students', auth, async (req, res) => {
  try {
    const { classId } = req.params;
    
    const result = await pool.query(
      `SELECT s.id, s.name, s.roll_number, s.school_name, s.guardian_name, s.guardian_phone,
              cs.enrolled_at,
              (SELECT COUNT(*) FROM attendance a WHERE a.student_id = s.id AND a.date = CURRENT_DATE) as today_attendance
       FROM students s
       JOIN class_students cs ON s.id = cs.student_id
       WHERE cs.class_id = $1`,
      [classId]
    );
    
    res.json({ students: result.rows });
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/teacher/attendance (Protected)
 * Submit attendance
 */
app.post('/api/teacher/attendance', auth, async (req, res) => {
  try {
    const { classId, studentId, date, status } = req.body;
    
    if (!classId || !studentId || !date || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if attendance already recorded for this student/class/date
    const existing = await pool.query(
      'SELECT * FROM attendance WHERE student_id = $1 AND class_id = $2 AND date = $3',
      [studentId, classId, date]
    );
    
    let attendanceId;
    
    if (existing.rows.length > 0) {
      // Update existing
      await pool.query(
        'UPDATE attendance SET status = $1, recorded_at = CURRENT_TIMESTAMP WHERE student_id = $2 AND class_id = $3 AND date = $4',
        [status, studentId, classId, date]
      );
      attendanceId = existing.rows[0].id;
    } else {
      // Create new
      const result = await pool.query(
        'INSERT INTO attendance (student_id, class_id, date, status, recorded_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id',
        [studentId, classId, date, status]
      );
      attendanceId = result.rows[0].id;
    }
    
    res.json({
      success: true,
      attendanceId
    });
  } catch (error) {
    console.error('Error submitting attendance:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/teacher/marks (Protected)
 * Add marks for a student
 */
app.post('/api/teacher/marks', auth, async (req, res) => {
  try {
    const { studentId, classId, testName, marksObtained, maxMarks, comments } = req.body;
    
    if (!studentId || !classId || !testName || marksObtained === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO marks (student_id, class_id, test_name, marks_obtained, max_marks, comments, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
       RETURNING id, marks_obtained, max_marks, test_name`,
      [studentId, classId, testName, marksObtained, maxMarks || 100, comments || '']
    );
    
    res.json({
      success: true,
      markId: result.rows[0].id,
      mark: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding marks:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/student/:studentId/classes (Student portal - no auth required for demo)
 * Get student's classes with marks
 */
app.get('/api/student/:studentId/classes', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const result = await pool.query(
      `SELECT c.id, c.name, c.subject, c.level,
              s.id as student_id, s.name as student_name,
              s.roll_number,
              COALESCE(
                (SELECT json_agg(json_build_object('test', m.test_name, 'marks', m.marks_obtained, 'max_marks', m.max_marks))
                 FROM marks m WHERE m.student_id = s.id),
               '[]'::json) as marks,
              COALESCE(
                (SELECT ROUND(AVG(m.marks_obtained::float / m.max_marks::float * 100)::numeric, 2)
                 FROM marks m WHERE m.student_id = s.id),
               0) as avgMarks,
              (
                SELECT COUNT(*) FROM attendance a WHERE a.student_id = s.id
              ) as totalAttendance
       FROM students s
       JOIN class_students cs ON s.id = cs.student_id
       JOIN classes c ON cs.class_id = c.id
       WHERE s.id = $1`,
      [studentId]
    );
    
    res.json({ classes: result.rows });
  } catch (error) {
    console.error('Error fetching student classes:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/student/:studentId/exams (Student portal)
 * Get student's exams
 */
app.get('/api/student/:studentId/exams', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const result = await pool.query(
      `SELECT e.id, e.subject, e.exam_date, e.exam_time, e.duration, e.exam_type,
              e.prep_status
       FROM exams e
       WHERE e.student_id = $1
       ORDER BY e.exam_date`,
      [req.params.studentId]
    );
    
    res.json({ exams: result.rows });
  } catch (error) {
    console.error('Error fetching exams:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/coordinator/classes (Protected)
 * Get all classes system-wide
 */
app.get('/api/coordinator/classes', authHeader, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.subject, c.level,
              COUNT(DISTINCT s.id) as student_count,
              (
                SELECT COUNT(*) FROM attendance a
                JOIN class_students cs ON a.student_id = cs.student_id
                WHERE cs.class_id = c.id AND a.status = 'present'
              ) as total_present
       FROM classes c
       LEFT JOIN class_students cs ON c.id = cs.class_id
       LEFT JOIN students s ON cs.student_id = s.id
       GROUP BY c.id
       ORDER BY c.name`
    );
    
    res.json({ classes: result.rows });
  } catch (error) {
    console.error('Error fetching coordinator classes:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/coordinator/stats (Protected)
 * Get coordinator statistics
 */
app.get('/api/coordinator/stats', authHeader, async (req, res) => {
  try {
    const [classesResult, attendanceResult, studentsResult] = await Promise.all([
      pool.query('SELECT COUNT(*) as total_classes FROM classes'),
      pool.query(`SELECT 
                    COALESCE(ROUND(COUNT(*) FILTER (WHERE status = 'present')::numeric / NULLIF(COUNT(*), 0)::numeric * 100, 0)::text, '0') as overall_attendance
                  FROM attendance`),
      pool.query('SELECT COUNT(*) as total_students FROM students')
    ]);
    
    res.json({
      total_classes: parseInt(classesResult.rows[0].total_classes),
      overall_attendance: attendanceResult.rows[0].overall_attendance,
      total_students: parseInt(studentsResult.rows[0].total_students)
    });
  } catch (error) {
    console.error('Error fetching coordinator stats:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/contact
 * Contact form submission
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // In production, you might save to database or send email
    console.log('Contact form submission:', { name, email, phone, message });
    
    res.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error handling contact form:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Koshish Club Backend running on port ${PORT}`);
  console.log(`API Base: http://localhost:${PORT}/api`);
});

module.exports = app;