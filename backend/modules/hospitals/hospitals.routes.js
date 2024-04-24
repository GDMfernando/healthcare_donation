'use strict';

const router = require('express').Router();
const hospitalController = require('./hospitals.controller');
const { upload } = require('../../config/constant.js');

module.exports = (app) => {
    router.post(
        '/register',
        upload.single('image'),
        hospitalController.hospitalRegister
    );
    router.post('/update/:id?', hospitalController.hospitalUpdate);
    router.get('/get/:id?', hospitalController.getHospitalById);
    router.get('/all', hospitalController.getAllHospitals);
    router.get('/delete/:id?', hospitalController.deleteHospitalById);
    return router;
};
