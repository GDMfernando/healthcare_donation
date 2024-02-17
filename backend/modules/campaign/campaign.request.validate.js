'use strict';

const Joi = require('joi');
const { validateHttpRequest } = require('../../utils/validation.helper');

function validateCampaignRegistration(req) {
    let data = req.body;
    let imageName = req.file ? req.file.filename : null;

    data ={
        ...data,
        image : imageName
    }
    const schema = Joi.object({
        hospital_id: Joi.number().required(),
        name: Joi.string().required(),
        patient_name: Joi.string().required(),
        target: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    });
    return validateHttpRequest(data, schema);
}

function validateCampaignUpdate(req) {
    let data = req.body;
    let imageName = req.file ? req.file.filename : null;

    data ={
        ...data,
        image : imageName
    }
    const schema = Joi.object({
        hospital_id: Joi.number().required(),
        name: Joi.string().required(),
        patient_name: Joi.string().required(),
        target: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    });
    return validateHttpRequest(data, schema);
}

module.exports = {
    validateCampaignRegistration,
    validateCampaignUpdate
    
};
