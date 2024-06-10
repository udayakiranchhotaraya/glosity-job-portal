const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const { createJob, getJobs, updateJob, deleteJob } = require('../controllers/job.controller');

const JobRouter = express.Router();

JobRouter.get('/', getJobs);
JobRouter.post('/', jwtMiddleware, createJob);
JobRouter.put('/update/:jobId', jwtMiddleware, updateJob);
JobRouter.delete('/delete/:jobId', jwtMiddleware, deleteJob);

module.exports = JobRouter;