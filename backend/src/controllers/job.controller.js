const mongoose = require('mongoose');

const { Company, Job } = require('../models');
const {} = require('../middlewares/jwt.middleware');

const message_403 = "Only Employers can access this route";

async function createJob (req, res) {
    if (req.user.isEmployer) {
        try {
            const { id } = req.user;
            const { jobTitle, jobDescription, location, jobType, workMode, responsibilities, requirements, salary, yearsOfExperience } = req.body;
            const job = await Job.create({
                jobTitle: jobTitle,
                jobDescription: jobDescription,
                companyID: id,
                location: location,
                jobType: jobType,
                workMode: workMode,
                responsibilities: responsibilities,
                requirements: requirements,
                salary: salary,
                yearsOfExperience: yearsOfExperience
            });

            const company = await Company.findOneAndUpdate({ _id: id }, {
                $push: {
                    jobs: job.id
                }
            }, {
                new: true
            });

            if (job && company) {
                return res.status(200).json({ "message" : "Job created successfully!" });
            } else {
                return res.status(400).json({ "message" : "Some error occurred!" });
            }
        } catch (error) {
            return res.status(400).json({ "message" : error.message });
        }
    } else {
        return res.status(403).json({ "message" : message_403 });
    }
}

async function getJobs (req, res) {
    try {
        const jobs = await Job.find(req.query);
        if (jobs) {
            return res.status(200).json({ jobs: jobs });
        } else {
            return res.status(400).json({ "message" : "Some error occurred" });
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

module.exports = {
    createJob,
    getJobs
}