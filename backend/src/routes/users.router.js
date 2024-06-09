const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerUser,
    loginUser
} = require('../controllers/users.controller');

const UserRouter = express.Router();

UserRouter.post('/signup', registerUser);
UserRouter.post('/signin', loginUser);

module.exports = UserRouter;