const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const { createJob, getJobs, applyJob } = require('../controllers/job.controller');

const JobRouter = express.Router();

JobRouter.get('/', getJobs);
JobRouter.post('/', jwtMiddleware, createJob);

module.exports = JobRouter;