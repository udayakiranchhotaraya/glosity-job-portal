const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema({
    employer : {
        // companyId: {
        //     type: mongoose.Schema.Types.ObjectId
        // },
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            unique: true,
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
        // required: true
    },
    companyDescription : {
        type: String,
        // required: true
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

companySchema.pre('save', async function (next) {
    const company = this;

    // Check if the password is being modified. Hash the password only if the password has been modified
    if (!(company.isModified('employer.password'))) {
        return next();
    }

    try {
        // Generate Salt
        const salt = await bcrypt.genSalt(12);

        // Hash the password
        const hashedPassword = await bcrypt.hash(company.employer.password, salt);

        // Override the plaintext passwrod with the hash password
        company.employer.password = String(hashedPassword);
        next();
    } catch (error) {
        return next(error);
    }
});

companySchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const CompanyModel = mongoose.model('Company', companySchema);
module.exports = CompanyModel;