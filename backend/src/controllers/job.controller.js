const mongoose = require('mongoose');

const { Company, Job } = require('../models');
const {} = require('../middlewares/jwt.middleware');

const message_403 = "Unauthorized to access this route";

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
        const jobs = await Job.find(req.query, {applicants: 0});
        if (jobs) {
            return res.status(200).json({ jobs: jobs });
        } else {
            return res.status(400).json({ "message" : "Some error occurred" });
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

async function updateJob (req, res) {
    if (req.user.isEmployer) {
        try {
            const { id } = req.user;
            const { jobId } = req.params;
            const { jobTitle, jobDescription, location, jobType, workMode, responsibilities, requirements, salary, yearsOfExperience } = req.body;
            const job = await Job.findOneAndUpdate({ _id: jobId, companyID: id }, {
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
            }, {
                new: true
            });

            if (job) {
                return res.status(200).json({ "message" : "Job updated successfully!" });
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

async function deleteJob (req, res) {
    if (req.user.isEmployer) {
        try {
            const { id } = req.user;
            const { jobId } = req.params;
            const job = await Job.findOneAndDelete({ _id: jobId, companyID: id });
            const company = await Company.findOneAndUpdate({ _id: id }, {
                $pull : {
                    jobs: job._id
                }
            });
            if (job && company) {
                return res.status(200).json({ "message" : "Job deleted successfully!" });
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

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
}