const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerUser,
    loginUser,
    applyJob,
    appliedJobs,
    updateOrAddProfileDetails,
    viewProfile,
    deleteProfile
} = require('../controllers/users.controller');

const UserRouter = express.Router();

UserRouter.get('/appliedJobs', jwtMiddleware, appliedJobs);
UserRouter.post('/signup', registerUser);
UserRouter.post('/signin', loginUser);
UserRouter.get('/profile', jwtMiddleware, viewProfile);
UserRouter.put('/profile/update', jwtMiddleware, updateOrAddProfileDetails);
UserRouter.delete('/profile', jwtMiddleware, deleteProfile);
UserRouter.put('/apply/:jobId', jwtMiddleware, applyJob);

module.exports = UserRouter;