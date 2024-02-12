'use strict';

const router = require('express').Router();
const UserController = require('./users.controller');

module.exports = (app) => {
    router.get('/user', UserController.userRegister);
    router.post('/register', UserController.userRegister);
    router.post('/login', UserController.userLogin);

    return router;
};
