const express = require('express');

require('dotenv').config();

const dbConnect = require('./db/db.config');

(async function () {
    try {
        await dbConnect()
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()