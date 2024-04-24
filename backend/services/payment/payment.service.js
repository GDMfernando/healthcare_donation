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

async function queryExecute(query) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbData = await dbInstance.queryExecute(query);
        if (dbData.success && dbData.data !== undefined) {
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

async function getHospitalDonations() {
    const dbQuery = PaymentModel.getHospitalDonations();
    return await queryExecute(dbQuery);
}

async function getHospitalDonationsByHospitalId(hospitalId) {
    const dbQuery = PaymentModel.getHospitalDonationsByHospitalId(hospitalId);
    return await queryExecute(dbQuery);
}

async function getCampaignDonations() {
    const dbQuery = PaymentModel.getCampaignDonations();
    return await queryExecute(dbQuery);
}

async function getCampaignDonationsByHospitalId(hospitalId) {
    const dbQuery = PaymentModel.getCampaignDonationsByHospitalId(hospitalId);
    return await queryExecute(dbQuery);
}

module.exports = {
    initPayment,
    updatePayment,
    getHospitalDonations,
    getHospitalDonationsByHospitalId,
    getCampaignDonations,
    getCampaignDonationsByHospitalId
};
