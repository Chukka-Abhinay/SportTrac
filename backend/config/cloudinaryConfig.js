// backend/config/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
// No need for dotenv.config() here if it's done in server.js,
// as process.env will already be populated.

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Always use HTTPS
});

export default cloudinary;