console.log("Starting Server now");

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });

require("dotenv").config();

// --- 🔑 Startup Environment Check ---
const requiredEnv = ["CLOUD_NAME", "API_KEY", "API_SECRET"];
let missing = requiredEnv.filter((envVar) => !process.env[envVar]);

if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1); // Stop the server
}


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK ✅",
    service: "Cloudinary Upload API",
    cloudinary: {
      cloud_name: process.env.CLOUD_NAME ? "SET" : "MISSING",
      api_key: process.env.API_KEY ? "SET" : "MISSING",
      api_secret: process.env.API_SECRET ? "SET" : "MISSING"
    },
    uptime: process.uptime().toFixed(2) + "s",
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get("/ping", (req, res) => {
  res.json({ message: "API is running 🚀" });
});


// Upload single image
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my_uploads",
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ----------------------
// Start server
// ----------------------
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:5500");
});
