const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Koshish backend is alive 🌱" });
});

app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
