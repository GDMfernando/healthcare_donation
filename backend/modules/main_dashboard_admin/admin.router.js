'use strict';

const router = require('express').Router();
const adminController = require('./admin.controller');

module.exports = (app) => {
    router.get('/admin-main-dash', adminController.adminDash);
    return router;
};
