'use strict';

const httpResponse = require('../../libs/api_response/http_response');
const { updatePayment } = require('../../services/payment/payment.service');

async function updatePayStatus(req, res, next) {
    console.log('Update payment----------------->>>>');
    // TO DO
    try {
        const { id } = req.params;
        const data = req.body ?? null;

        if (!id) {
            return httpResponse.badRequest(res, 'Payment id is required');
        }

        if (!data) {
            return httpResponse.badRequest(res, 'Payment data is required');
        }

        const updateFields = {
            pay_status: data.pay_status,
            updated_at: new Date()
        };

        const response = await updatePayment(id, updateFields);
        console.log('Update payment----------------->>>>', response);

        if (!response.success) {
            return httpResponse.failed(res, response.error);
        }

        return httpResponse.success(
            res,
            'Payment updated successfully',
            response.data
        );
    } catch (error) {
        console.error('Error updating payment:', error);
        return httpResponse.serverError(res, 'Error updating payment');
    }
}

module.exports = {
    updatePayStatus
};
