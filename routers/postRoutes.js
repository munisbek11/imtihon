const Router = require("express").Router;
const { getInitialPosts, getPostBySlug, createPost, updatePost, deletePost, getDolzarbPosts, searchFunc } = require("../controllers/postController");
const { verifyAdmin } = require('../middlewares/authMiddleware');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const postRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Operations related to posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get the latest 5 posts
 *     description: Fetch the latest 5 posts along with a flag indicating if there are more posts.
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of the latest posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 hasMore:
 *                   type: boolean
 *                   description: Indicates if there are more posts.
 *       500:
 *         description: Internal server error.
 */
postRouter.get("/posts", getInitialPosts);

/**
 * @swagger
 * /posts/{slug}:
 *   get:
 *     summary: Get a single post by slug
 *     description: Fetch a post by its slug.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A post object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found.
 */
postRouter.get("/posts/:slug", getPostBySlug);

/**
 * @swagger
 * components:
 *   schemas:
 *     PostCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: "Title of the post"
 *         content:
 *           type: string
 *           description: "Content of the post"
 *         category:
 *           type: string
 *           description: "Category of the post"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: "Tags associated with the post"
 *         highlighted:
 *           type: boolean
 *           description: "Whether the post is highlighted"
 * 
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with required information.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Post successfully created.
 *       400:
 *         description: Bad request.
 */
postRouter.post("/posts", verifyAdmin, createPost);


/**
 * @swagger
 * /posts/{slug}:
 *   put:
 *     summary: Update an existing post
 *     description: Update an existing post by its slug.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the post.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Post successfully updated.
 *       404:
 *         description: Post not found.
 */
postRouter.put("/posts/:slug", verifyAdmin, updatePost);

/**
 * @swagger
 * /posts/{slug}:
 *   delete:
 *     summary: Delete a post by slug
 *     description: Delete a post using its slug.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the post.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post successfully deleted.
 *       404:
 *         description: Post not found.
 */
postRouter.delete("/posts/:slug", verifyAdmin, deletePost);

/**
 * @swagger
 * /highlighted:
 *   get:
 *     summary: Get all highlighted posts
 *     description: Fetch all posts marked as highlighted.
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of highlighted posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: No highlighted posts found.
 */
postRouter.get('/highlighted', getDolzarbPosts);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search posts by title
 *     description: Search for posts based on a query parameter.
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The search query for posts' title.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts that match the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: No query provided.
 *       404:
 *         description: No posts found for the given query.
 */
postRouter.get('/search', searchFunc);

module.exports = postRouter;
