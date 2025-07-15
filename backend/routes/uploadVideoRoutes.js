import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// 1. Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// 2. File filter for video files
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|mov|avi|mkv|webm/;
  const mimetypes =
    /video\/mp4|video\/quicktime|video\/x-msvideo|video\/x-matroska|video\/webm/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Videos only (mp4, mov, avi, mkv, webm)"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleVideo = upload.single("video");

// 3. Upload endpoint
router.post("/", (req, res) => {
  uploadSingleVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (req.file) {
      return res.status(200).json({
        message: "Video uploaded successfully",
        video: `/${req.file.path}`, // You may want to serve this statically
      });
    }

    res.status(400).json({ message: "No video file provided" });
  });
});

export default router;
