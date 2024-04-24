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
                req.body = {
                    ...req.body,
                    granted_user: {
                        user_id: decodedToken.userId,
                        user_type: decodedToken.userType
                    }
                };

                if (decodedToken.userType === 'HOSPITAL_ADMIN') {
                    const hospitalData =
                        await authService.findHospitalAdminUserById(
                            decodedToken.userId
                        );

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
        httpResponse.failed(res, {
            error_code: 'TOKEN_EXPIRED',
            message: 'Token expired..!'
        });
    }
};

module.exports = {
    protect
};
