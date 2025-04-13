import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const name = path.parse(file.originalname).name
            .replace(/\s+/g, '-')         // Replace spaces with dashes
            .replace(/[()]/g, '')         // Remove parentheses
            .replace(/[^a-zA-Z0-9-_]/g, ''); // Remove other special characters

        const ext = path.extname(file.originalname);
        const uniqueName = `${name}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
});

// File type checker
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpg, jpeg, png, gif)'));
    }
}

// Multer upload instance
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// POST route for image upload
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or unsupported file type' });
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ message: 'Image upload successful', image: filePath });
});

export default router;
