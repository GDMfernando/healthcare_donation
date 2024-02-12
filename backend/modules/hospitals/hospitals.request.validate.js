'use strict';

const Joi = require('joi');
const { validateHttpRequest } = require('../../utils/validation.helper');

function validateHospitalRegistration(req) {
    let data = req.body;
    const schema = Joi.object({
        hospital_name: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().required(),
        hospital_type: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().max(16).min(7)
    });
    return validateHttpRequest(data, schema);
}

module.exports = {
    validateHospitalRegistration
};
