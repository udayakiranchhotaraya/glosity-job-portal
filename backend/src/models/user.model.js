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
        type: String,
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
},{
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const user = this;

    // Check if the password is being modified. Hash the password only if the password has been modified
    if (!(user.isModified('password'))) {
        return next();
    }

    try {
        // Generate Salt
        const salt = await bcrypt.genSalt(12);

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Override the plaintext passwrod with the hash password
        user.password = String(hashedPassword);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;