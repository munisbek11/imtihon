const Router = require('express').Router;

const { findCategory } = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/categories/:category', findCategory);

module.exports = categoryRouter;
