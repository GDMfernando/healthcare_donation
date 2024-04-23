'use strict';

const Joi = require('joi');
const { validateHttpRequest } = require('../../utils/validation.helper');

function validatePaymentInit(req) {
    let data = req.body;

    const schema = Joi.object({
        amount: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        currency: Joi.string().allow(null, ''),
        message: Joi.string().allow(null, ''),
        return_url: Joi.string().allow(null, ''),
        hospital_id: Joi.string().allow(null, ''),
        campaign_id: Joi.string().allow(null, '')
    });
    return validateHttpRequest(data, schema);
}

module.exports = {
    validatePaymentInit
};
