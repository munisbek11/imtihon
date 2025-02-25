const { login, logout, register } = require('../controllers/adminController');
const adminRouter = require("express").Router();

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Missing username or password, or username already exists
 */
adminRouter.post('/admin/register', register);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in, token returned
 *       400:
 *         description: Incorrect username or password
 *       404:
 *         description: Admin not found
 */
adminRouter.post('/admin/login', login);

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Logout as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Bearer token
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Invalid or missing token
 */
adminRouter.post('/admin/logout', logout);

module.exports = adminRouter;
