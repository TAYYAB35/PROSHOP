import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.filename}-${Date.now()}-${path.extname(file.originalname)}`);
    }
});

function checkFileType(req, res, next) {
    const filetypes = /jpg|jpeg|png|gif/;
    const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
    const mimetype = filetypes.test(req.file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only supported')
    }

}

const upload = multer({
    storage,
});

router.post('/', upload.single, (req, res) => {
    res.send({ message: 'Image Upload Success', image: `${req.file.path}` });
})

export default router;