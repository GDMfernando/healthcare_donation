'use strict';

const httpResponse = require('../../libs/api_response/http_response');
const { pay_here_merchant_id, pay_here_secret } = require('../../config/keys');
const { payHereHasGenerate } = require('../../utils/helper');
const { initPayment } = require('../../services/payment/payment.service');
const { validatePaymentInit } = require('./payment.request.validate');

async function payHerePaymentInitiate(req, res, next) {
    console.log('payHere init----------------->>>>');
    // TO DO
    try {
        const validatePayment = validatePaymentInit(req);
        if (!validatePayment) {
            const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
            const amount = req.body.amount ?? 0;
            const email = req.body.email ?? '';
            const name = req.body.name ?? '';
            const message = req.body.message ? req.body.message : null;

            let response = {
                payment: {
                    merchant_id: pay_here_merchant_id,
                    return_url:
                        req.body.return_url + '?redirect_status=succeeded',

                    cancel_url:
                        req.body.return_url + '?redirect_status=canceled',
                    notify_url: 'http://localhost:5000/api/payment/notify',
                    first_name: name,
                    last_name: '',
                    email: email,
                    phone: '0771234567',
                    address: 'No.1, Galle Road',
                    city: 'Colombo',
                    country: 'Sri Lanka',
                    order_id: orderId,
                    items: 'Donation',
                    currency: 'LKR',
                    amount: parseFloat(amount).toFixed(2),
                    hash: await payHereHasGenerate(
                        pay_here_merchant_id,
                        orderId,
                        amount,
                        'LKR',
                        pay_here_secret
                    )
                }
            };

            const paymentData = {
                hospital_id: req.body.hospital_id ?? null,
                campaign_id: req.body.campaign_id ?? null,
                payment_method: 'ONLINE',
                payment_gateway: 'PAYHERE',
                order_id: orderId,
                amount: amount,
                currency: 'LKR',
                first_name: name,
                last_name: '',
                email: email,
                phone: null,
                address: null,
                city: null,
                state: null,
                country: 'Sri Lanka',
                zip: null,
                return_url: response?.payment.return_url,
                cancel_url: response?.payment.cancel_url,
                item_name: 'Donation',
                hash_code: response?.hash,
                payment_intend_id: null,
                pay_status: 'PENDING',
                donner_message: message
            };

            const paymentInitiate = await initPayment(paymentData);
            if (!paymentInitiate.success) {
                httpResponse.failed(res, [paymentInitiate.error]);
            }

            response.payment.return_url =
                response.payment.return_url + `&pay_id=${paymentInitiate.data}`;
            response['payment_init'] = {
                pay_id: paymentInitiate.data
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
        httpResponse.failed(res, [e.message]);
    }
}

module.exports = {
    payHerePaymentInitiate
};
