'use strict';

const PaymentModel = require('./payment.model');
const dbConnection = require('../../libs/db/mysql2.class');
const dbInstance = new dbConnection();

async function initPayment(data) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = PaymentModel.createQuery();
        const dbData = await dbInstance.create(dbQuery, data);
        if (dbData.success) {
            returnData.success = true;
            returnData.data = dbData.data.insertId;
        } else {
            returnData.error =
                'Internal server error : DB query Executing error';
        }
    } catch (error) {
        returnData.error = error.message;
    }
    return returnData;
}

async function updatePayment(id, data) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = await PaymentModel.updateQuery('id');
        const dbData = await dbInstance.update(dbQuery, [data, id]);
        if (dbData.success) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Internal server error : DB query Executing error';
        }
    } catch (error) {
        returnData.error = error.message;
    }
    return returnData;
}

module.exports = { initPayment, updatePayment };
