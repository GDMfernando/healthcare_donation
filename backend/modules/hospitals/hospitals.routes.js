'use strict';

const router = require('express').Router();
const hospitalController = require('./hospitals.controller');

module.exports = (app) => {
    router.get('/hospital', hospitalController.getAllHospitals);
    router.post('/hospital-register', hospitalController.hospitalRegister);
    router.post('/edit', hospitalController.hospitalEdit);

    return router;
};
