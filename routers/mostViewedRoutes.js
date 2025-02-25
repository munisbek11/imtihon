const { findMostViewed } = require('../controllers/mostViewedController');

const MVRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Most Viewed
 *   description: Operations related to the most viewed posts
 */

/**
 * @swagger
 * /most-viewed:
 *   get:
 *     summary: Get the 10 most viewed posts
 *     description: Fetch the top 10 most viewed posts from the database.
 *     tags: [Most Viewed]
 *     responses:
 *       200:
 *         description: List of most viewed posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: No posts found.
 *       500:
 *         description: Internal server error.
 */
MVRouter.get('/most-viewed', findMostViewed);

module.exports = MVRouter;
