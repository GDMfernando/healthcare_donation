'use strict';

const { stripe_secret_key } = require('../../config/keys');
const stripe = require('stripe')(stripe_secret_key);
const httpResponse = require('../../libs/api_response/http_response');

async function stripePaymentInitiate(req, res, next) {
    console.log('init----------------->>>>');
    try {
        // create a PaymentIntent
        const payObj = await stripe.paymentIntents.create({
            amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
            currency: 'usd',
            setup_future_usage: 'off_session'
        });
        // Return the secret
        const { client_secret } = payObj;
        const response = {
            client_secret
        };
        httpResponse.success(res, 'Payment initiation successful', response);
    } catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
}

module.exports = {
    stripePaymentInitiate
};
