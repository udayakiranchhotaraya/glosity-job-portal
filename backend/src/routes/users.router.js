const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerUser,
    loginUser,
    applyJob,
    appliedJobs,
    updateOrAddProfileDetails,
    viewProfile,
    deleteProfile,
    addEducation,
    updateEducation,
    deleteEducation
} = require('../controllers/users.controller');

const UserRouter = express.Router();

UserRouter.get('/appliedJobs', jwtMiddleware, appliedJobs);
UserRouter.post('/signup', registerUser);
UserRouter.post('/signin', loginUser);
UserRouter.get('/profile', jwtMiddleware, viewProfile);
UserRouter.put('/profile/update', jwtMiddleware, updateOrAddProfileDetails);
UserRouter.post('/profile/education/add', jwtMiddleware, addEducation);
UserRouter.put('/profile/education/:educationId/update', jwtMiddleware, updateEducation);
UserRouter.delete('/profile/education/:educationId/delete', jwtMiddleware, deleteEducation);
UserRouter.delete('/profile', jwtMiddleware, deleteProfile);
UserRouter.post('/apply/:jobId', jwtMiddleware, applyJob);

module.exports = UserRouter;