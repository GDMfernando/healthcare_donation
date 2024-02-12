'use strict';

const Joi = require('joi');
const { validateHttpRequest } = require('../../utils/validation.helper');

function validateUserRegister(req) {
    let data = req.body;
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().max(16).min(7),
        user_type: Joi.string().required(),
        first_name: Joi.string().allow(null, ''),
        last_name: Joi.string().allow(null, ''),
        email: Joi.string().email().required(),
        status: Joi.string().allow(null, '')
    });
    return validateHttpRequest(data, schema);
}

function validateUserLogin(req) {
    let data = req.body;
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().max(16).min(7)
    });
    return validateHttpRequest(data, schema);
}

module.exports = {
    validateUserRegister,
    validateUserLogin
};
