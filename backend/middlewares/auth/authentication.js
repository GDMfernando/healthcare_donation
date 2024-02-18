'use strict';

const jwt = require('jsonwebtoken');
const httpResponse = require('../../libs/api_response/http_response');
const authService = require('../../services/auth/auth.service');
const { jwt_secret } = require('../../config/keys');

const protect = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const decodedToken = jwt.verify(token, jwt_secret);
            const user = await authService.findUserByIdAndUserType(
                decodedToken.userId,
                req.userType
            );
            if (user.success && user.data !== null) {
                next();
            } else {
                httpResponse.failed(res, {
                    error_code: 'INVALID_AUTH',
                    message: 'Access token invalid..!'
                });
            }
        } else {
            httpResponse.failed(res, {
                error_code: 'INVALID_AUTH',
                message: 'Token empty..!'
            });
        }
    } catch (error) {
        console.log(error);
        httpResponse.failed(res, {
            error_code: 'TOKEN_EXPIRED',
            message: 'Token expired..!'
        });
    }
};

module.exports = {
    protect
};
