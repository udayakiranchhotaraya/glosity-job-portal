const mongoose = require('mongoose');

const { User, Job } = require('../models');
const { generateToken } = require('../middlewares/jwt.middleware');

async function registerUser (req, res) {
    try {
        const { name, email, mobile, password } = req.body;
        const user = await User.create({
            email: email,
            mobile: mobile,
            name: name,
            password: password
        })

        const payload = {
            id: user.id,
            isEmployer: false
        };
        const token = generateToken(payload);

        if (user && token) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000*60*60*24*3,
                sameSite: 'strict'
            });
            return res.status(201).json({ "token": token, "user": { name: user.name }, "message" : "Registration successful!" });
        } else {
            return res.status(400).json({ "message" : "Some error occurred!" })
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

async function loginUser (req, res) {
    try {
        const { identification, password } = req.body;
        const user = await User.findOne({ $or: [ { email: { $eq: identification } }, { mobile: { $eq: identification } } ] });
        if (!(user) || !(await user.comparePassword(password))) {
            return res.status(401).json({"message" : "Invalid credientials"});
        }

        const payload = {
            id: user.id,
            isEmployer: false
        };
        const token = generateToken(payload);

        if (user && token) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000*60*60*24*3,
                sameSite: 'strict'
            });
            return res.status(201).json({ "token": token, "user": { name: user.name }, "message" : "Login successful!" });
        } else {
            return res.status(400).json({ "message" : "Some error occurred!" })
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

async function applyJob (req, res) {
    try {
        if (!(req.user.isEmployer)) {
            const { id } = req.user;
            const { jobId } = req.params;

            const job = await Job.findOneAndUpdate({ _id: jobId }, {
                $push : {
                    applicants: {
                        applicantID: id
                    }
                }
            }, {
                new: true
            });

            if (job) {
                return res.status(200).json({ "message" : "Applied to job successfully!" });
            } else {
                return res.status(400).json({ "message" : "Some error occurred!" });
            }
        } else {
            return res.status(403).json({ "message" : "Employers cannot apply for jobs!" });
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    applyJob
}