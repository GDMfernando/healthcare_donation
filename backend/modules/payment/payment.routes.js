'use strict';

const router = require('express').Router();
const { stripePaymentInitiate } = require('./stripePayment.controller');
const { payHerePaymentInitiate } = require('./payHerePayment.controller');

module.exports = (app) => {
    // router endpoints strip
    router.post('/stripe/init', stripePaymentInitiate);

    // router endpoints payHere
    router.post('/payhere/init', payHerePaymentInitiate);

    return router;
};
