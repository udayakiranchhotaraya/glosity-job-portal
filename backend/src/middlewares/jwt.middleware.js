const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtMiddleware = (req, res, next) => {
    // Checking if the request header has authorization or not
    const authorization = req.headers.authorization;
    if (!(authorization)) {
        return res.status(401).json({"error" : "Token not found!"});
    }

    // Extracting the JWT from the request headers
    const token = req.headers.authorization.split(" ")[1].trim();
    if (!(token)) {
        return res.status(401).json({"error" : "Unauthorized"});
    }

    try {
        // Verifying the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to request object
        req.user = decoded;
        return next();
    } catch (error) {
        console.error(error);
        res.status(401).json({"error" : error.message});
    }
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
}

module.exports = { jwtMiddleware, generateToken }