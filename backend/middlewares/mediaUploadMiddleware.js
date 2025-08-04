// backend/middleware/mediaUploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Using memoryStorage is the best practice for ephemeral environments like Render.
// It avoids writing files to the disk and losing them.
const storage = multer.memoryStorage();

const mediaFileFilter = (req, file, cb) => {
  const imageFiletypes = /jpe?g|png|webp|gif|tiff|bmp/;
  const videoFiletypes = /mp4|mov|avi|mkv|webm|flv|wmv/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (imageFiletypes.test(extname) && mimetype.startsWith('image/')) {
    return cb(null, true);
  } else if (videoFiletypes.test(extname) && mimetype.startsWith('video/')) {
    return cb(null, true);
  } else {
    cb(new Error("Unsupported file type."), false);
  }
};

const uploadMedia = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB file size limit
  fileFilter: mediaFileFilter
});

export default uploadMedia;