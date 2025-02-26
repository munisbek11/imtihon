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
 * components:
 *   schemas:
 *     ContactCreate:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the contact.
 *           minLength: 3
 *           maxLength: 100
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           description: The phone number of the contact.
 *           example: 123456789
 *         email:
 *           type: string
 *           description: The email address of the contact.
 *           pattern: ^\S+@\S+\.\S+$
 *           example: "john.doe@example.com"
 *         subject:
 *           type: string
 *           description: The subject of the contact message.
 *           enum: [Taklif, Tanqid, Shikoyat]
 *           example: "Taklif"
 *         message:
 *           type: string
 *           description: The message content.
 *           minLength: 10
 *           maxLength: 1000
 *           example: "Hello, I would like to inquire about your services."
 * 
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
 *             $ref: '#/components/schemas/ContactCreate'
 *     responses:
 *       201:
 *         description: Contact successfully created.
 *       400:
 *         description: Validation error (missing required fields or invalid format).
 *       500:
 *         description: Internal server error.
 */
contactRouter.post('/contacts', createContact);


module.exports = contactRouter;
