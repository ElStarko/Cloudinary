# Cloudinary
A Simple Image upload project using Cloudinary 

 Cloudinary Image Upload API

A simple Node.js + Express API for uploading images to Cloudinary.
Supports single and multiple file uploads and returns secure URLs for easy access.


---

Setup

1. Clone project & install dependencies

git clone <your-repo-url>
cd cloudinary-upload
npm install

2. Configure environment

Create a .env file in the root directory:

CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret

👉 Get these from your Cloudinary Console.


Running the Server

Start the server with:

node server.js

Expected output:

🚀 Server running on http://localhost:3000


---

API Endpoints

1. Health Check

Request:

GET /ping

Response:

{ "message": "API is running 🚀" }


---

2. Upload Single Image

Request:

POST /upload

Body (form-data):

Key: image (type: File)

Value: select a file


Response:

{
  "url": "https://res.cloudinary.com/<cloud_name>/image/upload/.../file.jpg"
}


---

3. Upload Multiple Images

Request:

POST /uploads

Body (form-data):

Key: images (type: File)

Value: select multiple files (max 5 by default)


Response:

{
  "urls": [
    "https://res.cloudinary.com/<cloud_name>/image/upload/.../file1.jpg",
    "https://res.cloudinary.com/<cloud_name>/image/upload/.../file2.jpg"
  ]
}


---

How It Works

1. Client Upload → Files sent via form-data.


2. Multer → Temporarily stores files in /uploads.


3. Cloudinary SDK → Uploads files to Cloudinary.


4. API Response → Returns secure_url of each file.


5. CDN Delivery → Files are globally accessible via Cloudinary’s CDN.


---

 Notes

Uploaded files are stored under Cloudinary folder: my_uploads.

If you get:

MulterError: Unexpected field → ensure form-data key is correct (image or images).

401 invalid cloud name → check .env credentials.
