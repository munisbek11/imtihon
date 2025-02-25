const Router = require('express').Router;
const { findCategory } = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Kategoriyalar bilan ishlash
 */

/**
 * @swagger
 * /categories/{category}:
 *   get:
 *     summary: Get posts by category
 *     description: Retrieve posts based on the category parameter. Categories include 'Sud-huquq', 'Ijtimoiy-iqtisodiy', 'Boshqa', 'Talim', 'Siyosat', 'Xorij'.
 *     tags: [Category]
 *     parameters:
 *       - name: category
 *         in: path
 *         description: The category to filter the posts by.
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - Sud-huquq
 *             - Ijtimoiy-iqtisodiy
 *             - Boshqa
 *             - Talim
 *             - Siyosat
 *             - Xorij
 *     responses:
 *       200:
 *         description: A list of posts for the given category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid category provided.
 *       404:
 *         description: No posts found in this category.
 *       500:
 *         description: Server error.
 */
const categoryRouter = Router();

categoryRouter.get('/categories/:category', findCategory);

module.exports = categoryRouter;
