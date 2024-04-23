'use strict';
const fs = require('fs');
const bcrypt = require('bcrypt');
const md5 = require('crypto-js/md5');

const { saltRounds } = require('../config/constant.js');

module.exports.encodeImageToBase64 = (imagePath) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        return base64Image;
    } catch (error) {
        console.error('Error encoding image to base64:', error);
        throw error;
    }
};

module.exports.hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

module.exports.payHereHasGenerate = async (
    merchantId,
    orderId,
    amount,
    currency,
    merchantSecret
) => {
    try {
        const amountFormated = parseFloat(amount)
            .toLocaleString('en-us', { minimumFractionDigits: 2 })
            .replaceAll(',', '');
        let hashedSecret = md5(merchantSecret).toString().toUpperCase();

        // ======================- Hash Generation -======================
        const hashInput =
            merchantId + orderId + amountFormated + currency + hashedSecret;
        const hash = md5(hashInput).toString().toUpperCase();

        return hash;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw error;
    }
};
