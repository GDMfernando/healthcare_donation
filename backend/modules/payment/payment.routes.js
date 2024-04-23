'use strict';

const router = require('express').Router();
const { stripePaymentInitiate } = require('./stripePayment.controller');
const { payHerePaymentInitiate } = require('./payHerePayment.controller');
const { updatePayStatus } = require('./payment.controller');

module.exports = (app) => {
    // router endpoints strip
    router.post('/stripe/init', stripePaymentInitiate);

    // router endpoints payHere
    router.post('/payhere/init', payHerePaymentInitiate);

    //common routes
    router.put('/update/:id', updatePayStatus);

    return router;
};
