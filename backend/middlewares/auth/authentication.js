'use strict';

// Import jsonwebtoken for token verification
const jwt = require('jsonwebtoken');
const httpResponse = require('../../libs/api_response/http_response');
const authService = require('../../services/auth/auth.service');
const { jwt_secret } = require('../../config/keys');

// Middleware function to protect routes requiring authentication
const protect = async (req, res, next) => {
    try {
        // Extract token from request header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            // Verify token using JWT library
            const decodedToken = jwt.verify(token, jwt_secret);
            // Find user by ID and user type from decoded token
            const user = await authService.findUserByIdAndUserType(
                decodedToken.userId,
                req.userType
            );

            // If user is found and token is valid, proceed
            if (user.success && user.data !== null) {
                // Add granted user information to request body
                req.body = {
                    ...req.body,
                    granted_user: {
                        user_id: decodedToken.userId,
                        user_type: decodedToken.userType
                    }
                };

                // If user type is 'HOSPITAL_ADMIN', find associated hospital ID
                if (decodedToken.userType === 'HOSPITAL_ADMIN') {
                    const hospitalData =
                        await authService.findHospitalAdminUserById(
                            decodedToken.userId
                        );
                    // If hospital data is found, add it to request body
                    if (
                        hospitalData.success &&
                        hospitalData.data !== null &&
                        hospitalData.data.length > 0
                    ) {
                        req.body = {
                            ...req.body,
                            addition: {
                                hospital_id: hospitalData.data[0].hospital_id
                            }
                        };
                    }
                }

                next();
            } else {
                // If token is invalid or user is not found, send error response
                httpResponse.failed(res, {
                    error_code: 'INVALID_AUTH',
                    message: 'Access token invalid..!'
                });
            }
        } else {
            // If token is missing, send error response
            httpResponse.failed(res, {
                error_code: 'INVALID_AUTH',
                message: 'Token empty..!'
            });
        }
    } catch (error) {
        // If token is expired or any other error occurs, send error response
        httpResponse.failed(res, {
            error_code: 'TOKEN_EXPIRED',
            message: 'Token expired..!'
        });
    }
};

module.exports = {
    protect
};
