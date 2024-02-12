'use strict';

const auth = require('./authentication');

const grant = (userType) => {
    return (req, res, next) => {
        req.userType = userType;
        auth.protect(req, res, next);
    };
};

module.exports = { grant };
