const multer = require('multer');
const { getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/aboutController');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const aboutRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

/**
 * @swagger
 * /author:
 *   get:
 *     summary: Get all authors
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: A list of authors
 */
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

/**
 * @swagger
 * /author:
 *   post:
 *     summary: Create a new author
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *               birthPlace:
 *                 type: string
 *               education:
 *                 type: string
 *               achievements:
 *                 type: string
 *               website:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Author successfully created
 */
aboutRouter.post('/author', verifyAdmin, upload.single('image'), createAuthor);

/**
 * @swagger
 * /author/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Author]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the author to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *               birthPlace:
 *                 type: string
 *               education:
 *                 type: string
 *               achievements:
 *                 type: string
 *               website:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Author successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Author not found
 */
aboutRouter.put('/author/:id', verifyAdmin, upload.single('image'), updateAuthor);

/**
 * @swagger
 * /author/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Author]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the author to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author successfully deleted
 *       404:
 *         description: Author not found
 */
aboutRouter.delete('/author/:id', verifyAdmin, deleteAuthor);

module.exports = aboutRouter;
