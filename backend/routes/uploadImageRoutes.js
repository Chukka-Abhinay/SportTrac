// backend/routes/uploadImageRoutes.js
import express from "express";
import uploadMedia from "../middlewares/mediaUploadMiddleware.js";
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

router.post("/", uploadMedia.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided." });
    }

    // Upload the file buffer to Cloudinary
    // This is the correct way to handle memory-stored files
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      {
        resource_type: "image",
        folder: "your_project_images", // Change this to your desired folder name in Cloudinary
      }
    );

    res.status(200).send({
      message: "Image uploaded successfully",
      image: result.secure_url, // Return the Cloudinary URL
      public_id: result.public_id, // For potential deletion
    });
  } catch (error) {
    console.error("❌ Cloudinary Image Upload Error:", error);
    res.status(500).send({ message: error.message || "Image upload failed." });
  }
});

export default router;