'use strict';

const Joi = require('joi');

module.exports.validateHttpRequest = (data, schema) => {
    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false,
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    const { error } = schema.validate(data, options);
    if (error) {
        let errorList = [];
        for (let index in error.details) {
            errorList.push({
                message: error.details[index].message,
                field: error.details[index].context.key
            });
        }
        return errorList;
    } else {
        return false;
    }
};
