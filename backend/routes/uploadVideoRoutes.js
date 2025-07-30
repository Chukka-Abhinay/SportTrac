// routes/videoUploadRoute.js
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();
const uploadPath = "/opt/render/project/uploads/videos";

// ✅ Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const isValidExt = /\.(mp4|mov|avi|mkv|webm)$/i.test(file.originalname);
  const isValidMime = /video\/(mp4|quicktime|x-msvideo|x-matroska|webm)/.test(file.mimetype);
  cb(isValidExt && isValidMime ? null : new Error("Videos only"), isValidExt && isValidMime);
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No video file provided" });

  res.status(200).json({
    message: "Video uploaded successfully",
    video: `/uploads/videos/${req.file.filename}`,
  });
});

export default router;
