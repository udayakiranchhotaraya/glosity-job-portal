const mongoose = require('mongoose');

const { Company } = require('../models');
const { generateToken } = require('../middlewares/jwt.middleware');

const message_403 = "Only Employers can access this route";

async function registerEmployer (req, res) {
    try {
        const { name, email, password } = req.body;
        // const company = new Company();
        // company.employer.name = name;
        // company.employer.email = email;
        // company.employer.password = password;
        const company = await Company.create({
            employer: {
                name: name,
                email: email,
                password: password
            }
        })
        // await company.save();

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

module.exports = {
    registerEmployer,
    login
}