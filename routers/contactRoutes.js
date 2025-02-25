const { createContact, getContacts, getContact } = require('../controllers/contactController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

const contactRouter = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Operations related to contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve all contacts from the database.
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of all contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error.
 */
contactRouter.get('/contacts', verifyAdmin, getContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     description: Retrieve a specific contact by its ID.
 *     tags: [Contact]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the contact to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal server error.
 */
contactRouter.get('/contacts/:id', verifyAdmin, getContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact entry in the database.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the contact.
 *               email:
 *                 type: string
 *                 description: The email address of the contact.
 *               message:
 *                 type: string
 *                 description: The message of the contact.
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Contact successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
contactRouter.post('/contacts', createContact);

module.exports = contactRouter;
