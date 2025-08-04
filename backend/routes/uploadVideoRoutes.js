// backend/routes/uploadVideoRoutes.js
import express from "express";
import uploadMedia from "../middlewares/mediaUploadMiddleware.js";
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

router.post("/", uploadMedia.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided." });
    }

    // Upload the file buffer to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      {
        resource_type: "video",
        folder: "your_project_videos", // Change this to your desired folder name in Cloudinary
      }
    );

    res.status(200).json({
      message: "Video uploaded successfully",
      video: result.secure_url, // Return the Cloudinary URL
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("❌ Cloudinary Video Upload Error:", error);
    res.status(500).json({ message: error.message || "Video upload failed." });
  }
});

export default router;