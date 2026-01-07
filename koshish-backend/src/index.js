require("dotenv").config();
const app = require("./app");
const pool = require("../../config/db");

const PORT = process.env.PORT || 5000;

pool.query("select now()")
  .then(res => {
    console.log("✅ DB connected at:", res.rows[0].now);
  })
  .catch(err => {
    console.error("❌ DB connection failed:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
