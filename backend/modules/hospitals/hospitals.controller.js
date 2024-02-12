'use strict';
const {
    validateHospitalRegistration
} = require('./hospitals.request.validate');
const httpResponse = require('../../libs/api_response/http_response');

async function getAllHospitals(req, res, next) {
    /**
     *
     * TO DO
     */
}

async function hospitalRegister(req, res, next) {
    console.log('hospitalRegister() =========> ');
    /**
     *
     * TO DO
     */
    try {
        const validate = validateHospitalRegistration(req);
        if (!validate) {
        } else {
            httpResponse.failed(res, validate);
        }
    } catch (error) {
        throw error;
    }
}

async function hospitalEdit(req, res, next) {
    /**
     *
     * TO DO
     */
}

module.exports = {
    getAllHospitals,
    hospitalRegister,
    hospitalEdit
};
