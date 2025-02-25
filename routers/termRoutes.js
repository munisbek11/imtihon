const { getAlphabet, getTermsByLetter, createTerm, getAllTerms, updateTerm, deleteTerm } = require('../controllers/termController')
const { verifyAdmin } = require('../middlewares/authMiddleware')

const termsRouter = require('express').Router();

termsRouter.get('/encyclopedia/letter', getAlphabet);
termsRouter.get('/encyclopedia/letter/:letter', getTermsByLetter);
termsRouter.post('/encyclopedia/terms', verifyAdmin,createTerm);
termsRouter.get('/encyclopedia/terms', getAllTerms);
termsRouter.put('/encyclopedia/terms/:id', verifyAdmin,updateTerm);
termsRouter.delete('encyclopedia/terms/:id', verifyAdmin,deleteTerm);


module.exports = termsRouter;