const multer = require('multer')
const { getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/aboutController')
const { verifyAdmin } = require('../middlewares/authMiddleware')
const aboutRouter = require('express').Router();
const path = require('path')
const fs = require('fs')

aboutRouter.get('/author', getAuthor);

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

aboutRouter.post('/author',verifyAdmin, upload.single('image'), createAuthor);
aboutRouter.put('/author/:id', upload.single('image'),verifyAdmin, updateAuthor);	
aboutRouter.delete('/author/:id',verifyAdmin, deleteAuthor);

module.exports = aboutRouter