const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name : {
        firstName : {
            type: String,
            required: true
        },
        lastName : {
            type: String
        }
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    mobile : {
        type: Number,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profilePictureURL : {
        type: String
    },
    education : [{
        institutionName : {
            type: String
        },
        degree : {
            type: String
        },
        yearOfPassing : {
            type: String
        }
    }],
    skills : [{
        type: String
    }],
    projects : [{
        projectTitle : {
            type: String
        },
        projectDescription : {
            type: String
        },
        startingDate : {
            type: String
        },
        endingDate : {
            type: String
        }
    }],
    resumeURL : {
        type: String
    },
    profileVisibility : {
        type: String,
        enum: ['private', 'public'],
        default: 'public'
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;