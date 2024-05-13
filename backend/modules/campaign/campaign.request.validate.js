'use strict';

const Joi = require('joi');
const { validateHttpRequest } = require('../../utils/validation.helper');

// Function to validate campaign registration request
function validateCampaignRegistration(req) {
    let data = req.body;
    let imageName = req.file ? req.file.filename : null;

    // Add image name to data object
    data = {
        ...data,
        image: imageName
    };
    // Define validation schema using Joi
    const schema = Joi.object({
        hospital_id: Joi.number().required(),
        name: Joi.string().required(),
        patient_name: Joi.string().required(),
        target: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.required()
    });
    return validateHttpRequest(data, schema);
}

// Function to validate campaign update request
function validateCampaignUpdate(req) {
    let data = req.body;
    let imageName = req.file ? req.file.filename : null;

    data = {
        ...data,
        image: imageName
    };
    // Define validation schema using Joi
    const schema = Joi.object({
        hospital_id: Joi.number().required(),
        name: Joi.string().required(),
        patient_name: Joi.string().required(),
        target: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required()
    });
    return validateHttpRequest(data, schema);
}
// Export validation functions
module.exports = {
    validateCampaignRegistration,
    validateCampaignUpdate
};
