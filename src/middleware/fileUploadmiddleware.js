import multer from 'multer';
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance with the configured storage
const upload = multer({ storage: storage });

export { upload };
