console.log("Starting Server now");

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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
