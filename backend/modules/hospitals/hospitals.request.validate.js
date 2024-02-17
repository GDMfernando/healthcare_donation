'use strict';

const Joi = require('joi');
const { validateHttpRequest } = require('../../utils/validation.helper');

function validateHospitalRegistration(req) {
    let data = req.body;
    let imageName = req.file ? req.file.filename : null;

    data = {
        ...data,
        image: imageName
    };
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().required().email(),
        type: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().max(16).min(7),
        image: Joi.required()
    });
    return validateHttpRequest(data, schema);
}

function validateHospitalUpdate(req) {
    let data = req.body;
    let imageName = req.file ? req.file.filename : null;

    data = {
        ...data,
        image: imageName
    };
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().required().email(),
        type: Joi.string().required(),
        username: Joi.string().required(),
        image: Joi.string().required()
    });
    return validateHttpRequest(data, schema);
}

module.exports = {
    validateHospitalRegistration,
    validateHospitalUpdate
};
