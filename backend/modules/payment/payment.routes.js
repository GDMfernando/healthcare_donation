'use strict';

const router = require('express').Router();
const { stripePaymentInitiate } = require('./stripePayment.controller');
const { payHerePaymentInitiate } = require('./payHerePayment.controller');
const {
    updatePayStatus,
    getAllCampaignDonations,
    getAllHospitalDonations
} = require('./payment.controller');
const auth = require('../../middlewares/auth/authHandler');

module.exports = (app) => {
    // router endpoints strip
    router.post('/stripe/init', stripePaymentInitiate);

    // router endpoints payHere
    router.post('/payhere/init', payHerePaymentInitiate);

    //common routes
    router.put('/update/:id', updatePayStatus);

    router.get(
        '/get/hospital/donations',
        auth.grant('SUPER_ADMIN|HOSPITAL_ADMIN'),
        getAllHospitalDonations
    );

    router.get(
        '/get/campaign/donations',
        auth.grant('SUPER_ADMIN|HOSPITAL_ADMIN'),
        getAllCampaignDonations
    );

    return router;
};
