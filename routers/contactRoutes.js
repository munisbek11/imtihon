const { createContact, getContacts, getContact } = require('../controllers/contactController')
const { verifyAdmin } = require('../middlewares/authMiddleware')

const contactRouter = require('express').Router()

contactRouter.get('/contacts', verifyAdmin ,getContacts)
contactRouter.get('/contacts/:id', verifyAdmin, getContact)
contactRouter.post('/contacts', createContact)


module.exports = contactRouter