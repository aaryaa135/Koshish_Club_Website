const { Pool } = require("pg");

console.log("🔍 DATABASE_URL =", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ DB CONNECTED");
    const res = await client.query("select now()");
    console.log("🕒 DB time:", res.rows[0]);
    client.release();
  } catch (err) {
    console.error("❌ FULL DB ERROR ↓↓↓");
    console.error(err);   // NOT err.message
  }
})();

module.exports = pool;
