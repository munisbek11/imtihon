const { login, logout, register } = require('../controllers/adminController')

const Router = require("express").Router();

const adminRouter = Router;

adminRouter.post('/admin/register', register);
adminRouter.post('/admin/login', login);
adminRouter.post('/admin/logout', logout);

module.exports = adminRouter;
