'use strict';
const fs = require('fs');
const bcrypt = require('bcrypt');
const {saltRounds} = require('../config/constant.js');

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

