const express = require("express");
const router = express.Router();

const { teacherRegister } = require("../controllers/auth.controller");

router.post("/teacher-register", teacherRegister);

module.exports = router;
