const mongoose = require('mongoose');

const { Company } = require('../models');
const { generateToken } = require('../middlewares/jwt.middleware');

const message_403 = "Only Employers can access this route";

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

module.exports = {
    registerEmployer,
    login,
    addOrUpdateCompanyDetails
}