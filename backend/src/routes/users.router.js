const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerUser,
    loginUser,
    applyJob
} = require('../controllers/users.controller');

const UserRouter = express.Router();

UserRouter.post('/signup', registerUser);
UserRouter.post('/signin', loginUser);
UserRouter.put('/apply/:jobId', jwtMiddleware, applyJob);

module.exports = UserRouter;