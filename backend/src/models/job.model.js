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
    responsibilites : {
        type: String,
        required: true
    },
    requirements : {
        type: String,
        required: true
    },
    CTC : {
        type: String,
        required: true
    },
    stipend : {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const jobModel = mongoose.model('Job', jobSchema);
module.exports = jobModel;