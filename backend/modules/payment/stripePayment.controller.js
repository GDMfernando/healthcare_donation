'use strict';

const { stripe_secret_key } = require('../../config/keys');
const stripe = require('stripe')(stripe_secret_key);
const httpResponse = require('../../libs/api_response/http_response');
const { initPayment } = require('../../services/payment/payment.service');
const { validatePaymentInit } = require('./payment.request.validate');

// Function to initiate a payment using Stripe
async function stripePaymentInitiate(req, res, next) {
    try {
        // Validate the payment request
        const validatePayment = validatePaymentInit(req);
        if (!validatePayment) {
            const { name, email, amount, message } = req.body;
            // Create a payment intent with Stripe
            const payObj = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'usd',
                setup_future_usage: 'off_session'
            });

            const { client_secret } = payObj;
            // Generate a random order ID
            const orderId = 'ORD' + Math.floor(Math.random() * 1000000);

            // Prepare payment data
            const paymentData = {
                hospital_id: req.body.hospital_id ?? null,
                campaign_id: req.body.campaign_id ?? null,
                payment_method: 'ONLINE',
                payment_gateway: 'STRIPE',
                order_id: orderId,
                amount: amount,
                currency: req.body.currency ?? 'USD',
                first_name: name,
                email: email,
                country: 'Sri Lanka',
                return_url: req.body.return_url,
                item_name: 'Donation',
                payment_intend_id: client_secret,
                pay_status: 'PENDING',
                donner_message: message
            };

            // Initialize the payment
            const paymentInitiate = await initPayment(paymentData);
            if (!paymentInitiate.success) {
                httpResponse.failed(res, [paymentInitiate.error]);
            }

            // Prepare response object
            const response = {
                payment: {
                    client_secret
                },
                payment_init: {
                    pay_id: paymentInitiate.data,
                    hospital_id: req.body.hospital_id ?? null,
                    campaign_id: req.body.campaign_id ?? null,
                    order_id: orderId,
                    amount: amount,
                    first_name: name,
                    email: email,
                    return_url:
                        req.body.return_url + `?pay_id=${paymentInitiate.data}`,
                    pay_status: 'PENDING'
                }
            };

            httpResponse.success(
                res,
                'Payment initiation successful',
                response
            );
        } else {
            httpResponse.failed(res, validatePayment);
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: e.message
        });
    }
}

module.exports = {
    stripePaymentInitiate
};
