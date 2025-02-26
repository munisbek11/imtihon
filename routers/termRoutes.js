const { getAlphabet, getTermsByLetter, createTerm, getAllTerms, updateTerm, deleteTerm } = require('../controllers/termController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

const termsRouter = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Encyclopedia
 *   description: Operations related to terms in the encyclopedia
 */

/**
 * @swagger
 * /encyclopedia/letter:
 *   get:
 *     summary: Get the alphabet
 *     description: Returns the full alphabet, including special characters.
 *     tags: [Encyclopedia]
 *     responses:
 *       200:
 *         description: A list of all letters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: ["A", "B", "C", "D", ...]
 */
termsRouter.get('/encyclopedia/letter', getAlphabet);

/**
 * @swagger
 * /encyclopedia/letter/{letter}:
 *   get:
 *     summary: Get terms starting with a specific letter
 *     description: Returns terms that start with a specific letter.
 *     tags: [Encyclopedia]
 *     parameters:
 *       - in: path
 *         name: letter
 *         required: true
 *         description: The first letter to filter terms by.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of terms starting with the specified letter.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Term'
 *       404:
 *         description: No terms found for the given letter.
 */
termsRouter.get('/encyclopedia/letter/:letter', getTermsByLetter);

/**
 * @swagger
 * components:
 *   schemas:
 *     TermCreate:
 *       type: object
 *       required:
 *         - term
 *         - description
 *       properties:
 *         term:
 *           type: string
 *           description: "The term being added"
 *         description:
 *           type: string
 *           description: "Description of the term"
 * 
 * /encyclopedia/terms:
 *   post:
 *     summary: Create a new term
 *     description: Create a new term with the term and its description.
 *     tags: [Encyclopedia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TermCreate'
 *     responses:
 *       201:
 *         description: Term successfully created.
 *       400:
 *         description: Missing required fields (term or description).
 */
termsRouter.post('/encyclopedia/terms', verifyAdmin, createTerm);


/**
 * @swagger
 * /encyclopedia/terms:
 *   get:
 *     summary: Get all terms
 *     description: Returns a list of all terms in the encyclopedia.
 *     tags: [Encyclopedia]
 *     responses:
 *       200:
 *         description: A list of all terms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Term'
 */
termsRouter.get('/encyclopedia/terms', getAllTerms);

/**
 * @swagger
 * /encyclopedia/terms/{id}:
 *   put:
 *     summary: Update an existing term
 *     description: Update a term by its ID.
 *     tags: [Encyclopedia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the term to update.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TermUpdate'
 *     responses:
 *       200:
 *         description: Term successfully updated.
 *       400:
 *         description: Missing required fields (term or description).
 *       404:
 *         description: Term not found.
 */
termsRouter.put('/encyclopedia/terms/:id', verifyAdmin, updateTerm);

/**
 * @swagger
 * /encyclopedia/terms/{id}:
 *   delete:
 *     summary: Delete a term by ID
 *     description: Delete a term using its ID.
 *     tags: [Encyclopedia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the term to delete.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Term successfully deleted.
 *       404:
 *         description: Term not found.
 */
termsRouter.delete('/encyclopedia/terms/:id', verifyAdmin, deleteTerm);

module.exports = termsRouter;
