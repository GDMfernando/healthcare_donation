'use strict';

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    databaseHost: process.env.DATABASE_HOST,
    databaseUsername: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    jwt_secret: process.env.JWT_SECRET,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    merchant_id: process.env.MERCHANT_ID
};
