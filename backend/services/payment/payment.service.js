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

async function getAllDonations() {
    const dbQuery = PaymentModel.getAllDonationsUS();
    const dataUS = await queryExecute(dbQuery);
    const dbQuery2 = PaymentModel.getAllDonationsLKR();
    const dataLKR = await queryExecute(dbQuery2);
    return {
        usd_total:
            dataUS.success && dataUS?.data.length > 0
                ? dataUS?.data[0].usd_total
                : 0,
        lkr_total:
            dataLKR.success && dataLKR?.data.length > 0
                ? dataLKR?.data[0].lkr_total
                : 0
    };
}

async function getDonationsByHospitalId(hospitalId) {
    const dbQuery = PaymentModel.getDonationsByHospitalIdUSD(hospitalId);
    const data = await queryExecute(dbQuery);
    const dbQuery2 = PaymentModel.getDonationsByHospitalIdLKR(hospitalId);
    const data2 = await queryExecute(dbQuery2);
    return {
        usd_total:
            data.success && data?.data.length > 0 ? data?.data[0].usd_total : 0,
        lkr_total:
            data2.success && data2?.data.length > 0
                ? data2?.data[0].lkr_total ?? 0
                : 0
    };
}

async function getDonationCampaignId(campaignId) {
    const dbQuery = PaymentModel.getDonationCampaignId(campaignId);
    const data = await queryExecute(dbQuery);
    if (data.success && data?.data.length > 0) {
        return data?.data[0].total_amount;
    }
    return 0;
}

async function getTotalDonations() {
    const hospitalDonations = await getHospitalDonations();
    const campaignDonations = await getCampaignDonations();
    return hospitalDonations.success && campaignDonations.success
        ? hospitalDonations.data.length + campaignDonations.data.length
        : 0;
}

module.exports = {
    initPayment,
    updatePayment,
    getHospitalDonations,
    getHospitalDonationsByHospitalId,
    getCampaignDonations,
    getCampaignDonationsByHospitalId,
    getAllDonations,
    getDonationsByHospitalId,
    getDonationCampaignId,
    getTotalDonations
};
