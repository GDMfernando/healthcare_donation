'use strict';

const httpResponse = require('../../libs/api_response/http_response');

async function payHerePaymentInitiate(req, res, next) {
    console.log('payHere init----------------->>>>');
    try {
        httpResponse.success(res, 'Payment initiation successful');
    } catch (e) {
        httpResponse.failed(res, [e.message]);
    }
}

module.exports = {
    payHerePaymentInitiate
};
