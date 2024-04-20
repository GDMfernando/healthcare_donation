'use strict';

const router = require('express').Router();

const { stripe_secret_key } = require('../../config/keys');
const stripe = require('stripe')(stripe_secret_key);

module.exports = (app) => {
    // router endpoints
    router.post('/intents', async (req, res, next) => {
        try {
            console.log('init----------------->>>>');
            // create a PaymentIntent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
                currency: 'usd',
                setup_future_usage: 'off_session'
            });
            // Return the secret
            res.json({ paymentIntent: paymentIntent.client_secret });
        } catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    });

    return router;
};
