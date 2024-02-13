'use strict';

const router = require('express').Router();
const hospitalController = require('./hospitals.controller');

module.exports = (app) => {
    router.post('/register', hospitalController.hospitalRegister);
    router.post('/update/:id', hospitalController.hospitalUpdate);
    router.get('/get/:id', hospitalController.getHospitalById);
    router.get('/all', hospitalController.getAllHospitals);

    return router;
};
