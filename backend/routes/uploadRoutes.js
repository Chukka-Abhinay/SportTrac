// routes/imageUploadRoute.js
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();
const uploadPath = "/opt/render/project/uploads/images";

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
  const isValidExt = /\.(jpe?g|png|webp)$/i.test(file.originalname);
  const isValidMime = /image\/(jpe?g|png|webp)/.test(file.mimetype);
  cb(isValidExt && isValidMime ? null : new Error("Images only"), isValidExt && isValidMime);
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image file provided" });

  res.status(200).json({
    message: "Image uploaded successfully",
    image: `/uploads/images/${req.file.filename}`,
  });
});

export default router;
