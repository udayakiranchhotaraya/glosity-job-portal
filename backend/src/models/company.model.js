const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    employer : {
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        passkey : {
            type: String
        }
    },
    companyName : {
        type: String,
        required: true
    },
    companyDescription : {
        type: String,
        required: true
    },
    numberOfEmployees : {
        type: Number
    },
    establishmentDate : {
        type: Date
    },
    location : {
        type: String
    },
    imageURLs : [{
        type: String
    }],
    companyLogo : {
        type: String
    },
    benefits : {
        type: String
    },
    profileVisibility : {
        type: String,
        enum: ['private', 'public'],
        default: 'public'
    },
    jobs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
}, {
    timestamps: true
});

const CompanyModel = mongoose.model('Company', companySchema);
module.exports = CompanyModel;