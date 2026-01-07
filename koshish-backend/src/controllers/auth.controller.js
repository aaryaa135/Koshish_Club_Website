const pool = require("../../../config/db");
const bcrypt = require("bcrypt");

exports.teacherRegister = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { email, password, name, phone, subject } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // check if user exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // insert teacher
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, phone, subject)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, role`,
      [email, passwordHash, name, "teacher", phone, subject]
    );

    return res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("REGISTER ERROR FULL:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
