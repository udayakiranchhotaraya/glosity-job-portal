const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    jobTitle : {
        type: String,
        required: true
    },
    jobDescription : {
        type: String,
        required: true
    },
    companyID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    location : {
        type: String,
        required: true
    },
    jobType : {
        type: String,
        enum: ['internship', 'full-time', 'part-time'],
        required: true
    },
    workMode : {
        type: String,
        enum: ['remote', 'onsite'],
        required: true
    },
    responsibilities : {
        type: String,
        required: true
    },
    requirements : {
        type: String,
        required: true
    },
    salary : {
        type: String,
        required: true
    },
    yearsOfExperience : {
        type: String,
        required: true
    },
    jobVisibility : {
        type: Boolean,
        required: true,
        default: true
    },
    applicants : [{
        _id: false,
        applicantID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        appliedAt : {
            type:Date,
            default:Date.now
        },
    }]
}, {
    timestamps: true
});

const JobModel = mongoose.model('Job', jobSchema);
module.exports = JobModel;