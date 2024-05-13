'use strict';

// Import bcrypt for password hashing and comparison
const { hash, compare } = require('bcrypt');
// Import jsonwebtoken for token generation
const jwt = require('jsonwebtoken');
const httpResponse = require('../../libs/api_response/http_response');
const userService = require('../../services/users/users.service');
const {
    validateUserRegister,
    validateUserLogin
} = require('./users.request.validate');

const { jwt_secret } = require('../../config/keys');

// Function to handle user registration
function userRegister(req, res, next) {
    const validate = validateUserRegister(req);
    if (!validate) {
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
    } else {
        httpResponse.failed(res, validate);
    }
}

// Function to handle user login
async function userLogin(req, res, next) {
    console.log('userLogin() =============>');
    try {
        const validate = validateUserLogin(req);
        if (!validate) {
            const { username, password } = req.body;
            const userData = await userService.findUserByUsername(username);
            if (userData.success) {
                const isMatch = await compare(password, userData.data.password);
                if (isMatch) {
                    const token = jwt.sign(
                        {
                            userId: userData.data.id,
                            username: userData.data.username,
                            userType: userData.data.user_type
                        },
                        jwt_secret,
                        { expiresIn: '1h' }
                    );

                    const resData = {
                        token_type: 'Bearer',
                        token,
                        expire_in: 3600,
                        userType: userData.data.user_type
                    };

                    httpResponse.success(
                        res,
                        'Access token generate successfully',
                        resData
                    );
                } else {
                    httpResponse.failed(
                        res,
                        'Sorry, the password you entered does not match our records.'
                    );
                }
            } else {
                httpResponse.failed(res, userData.error);
            }
        } else {
            httpResponse.failed(res, validate);
        }
    } catch (error) {}
}

module.exports = {
    userRegister,
    userLogin
};
