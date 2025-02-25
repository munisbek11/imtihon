const Router = require("express").Router;
const { getInitialPosts, getPostBySlug, createPost, updatePost, deletePost, getDolzarbPosts, searchFunc } = require("../controllers/postController");
const { verifyAdmin } = require('../middlewares/authMiddleware')
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const postRouter = Router();

postRouter.get("/posts", getInitialPosts);
postRouter.get("/posts/:slug", getPostBySlug);

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

postRouter.post("/posts", verifyAdmin, upload.single("image"), createPost);
postRouter.put("/posts/:slug", verifyAdmin, updatePost);
postRouter.delete("/posts/:slug", verifyAdmin, deletePost);
postRouter.get('/highlighted', getDolzarbPosts)
postRouter.get('/search', searchFunc)

module.exports = postRouter;
