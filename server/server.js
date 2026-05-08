const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config(); // ← FIRST LINE, before everything

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Connect to MongoDB
connectDB();

const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===== API ROUTES =====
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Planify API is running!",
    version: "1.0.0",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// ===== ERROR HANDLING =====
app.use(notFound);
app.use(errorHandler);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("================================");
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 API: http://localhost:${PORT}`);
  console.log("================================");
});
