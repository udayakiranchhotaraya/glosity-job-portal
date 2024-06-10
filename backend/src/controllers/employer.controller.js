const mongoose = require('mongoose');

const { Company, Job, User } = require('../models');
const { generateToken } = require('../middlewares/jwt.middleware');

const message_403 = "Unauthorised to access this route";

async function registerEmployer (req, res) {
    try {
        const { name, email, password } = req.body;
        const company = await Company.create({
            employer: {
                name: name,
                email: email,
                password: password
            }
        })

        const payload = {
            id: company.id,
            isEmployer: true
        };
        const token = generateToken(payload);

        if (company.employer && token) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000*60*60*24*3,
                sameSite: 'strict'
            });
            return res.status(201).json({ "token": token, "user": { name: company.employer?.name }, "message" : "Registration successful!" });
        } else {
            return res.status(400).json({ "message" : "Some error occurred!" })
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

async function login (req, res) {
    try {
        const { email, password } = req.body;
        const company = await Company.findOne({ "employer.email": email});

        const payload = {
            id: company.id,
            isEmployer: true
        };
        const token = generateToken(payload);

        if (company && token) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000*60*60*24*3,
                sameSite: 'strict'
            });
            return res.status(201).json({ "token": token, "user": { name: company.employer?.name }, "message" : "Login successful!" });
        } else {
            return res.status(400).json({ "message" : "Some error occurred!" })
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

async function addOrUpdateCompanyDetails (req, res) {
    if (req.user.isEmployer) {
        try {
            const { id } = req.user;
            const { companyName, companyDescription, numberofEmployees, establishmentDate, location, companyLogo, benefits } = req.body;
            const companyDetails = await Company.findOneAndUpdate({ _id: id }, {
                companyName: companyName,
                companyDescription: companyDescription,
                numberOfEmployees: numberofEmployees,
                establishmentDate: establishmentDate,
                location: location,
                companyLogo: companyLogo,
                benefits: benefits,
            }, {
                new: true,
                runValidators: true
            });
            if (companyDetails) {
                return res.status(200).json({ "message" : "Company details updated successfully!" });
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

async function getJobDetails (req, res) {
    if (req.user.isEmployer) {
        const { id } = req.user;
        const { jobId } = req.params;
        const job = await Job.findOne({ _id: jobId, companyID: id}, {applicants: 0});
        if (job) {
            return res.status(200).json({ job : job });
        } else {
            return res.status(404).json({ "message" : "No jobs found!" });
        }
    } else {
        return res.status(403).json({ "message" : message_403 });
    }
}

async function getApplicants (req, res) {
    if (req.user.isEmployer) {
        const { id } = req.user;
        const { jobId } = req.params;
        const job = await Job.findOne({ _id: jobId, companyID: id});
        const applicants = await Promise.all(job.applicants.map(async (currApplicant) => {
            // console.log(currApplicant);
            const applicant = await User.findOne({ _id: currApplicant.applicantID }, {password: 0}).lean();
            if (applicant) {
                return { ...applicant, appliedAt: currApplicant.appliedAt};
            }
            return null;
        }));
        // console.log(applicants);
        if (job && applicants) {
            return res.status(200).json({ job , applicants });
        } else {
            return res.status(404).json({ "message" : "No jobs found!" });
        }
    } else {
        return res.status(403).json({ "message" : message_403 });
    }
}

module.exports = {
    registerEmployer,
    login,
    addOrUpdateCompanyDetails,
    getJobDetails,
    getApplicants
}