const { findMostViewed } = require('../controllers/mostViewedController')

const Router = require("express").Router();

const MVRouter = Router;

MVRouter.get('/most-viewed', findMostViewed)

module.exports = MVRouter;