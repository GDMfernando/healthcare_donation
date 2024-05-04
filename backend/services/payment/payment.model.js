'use strict';

const mainModel = require('../../libs/db/main_model.class');

class PaymentModel extends mainModel {
    constructor() {
        super('payment_tb');
    }

    getHospitalDonations() {
        return `
        SELECT 
            pt.amount as amount,
            pt.first_name as donner_name,
            pt.email as donner_email,
            ht.name  as hospital_name,
            ht.phone_number as hospital_phone_number 
        FROM 
            payment_tb pt,
            hospital_tb ht 
        WHERE 
            pt.hospital_id = ht.id
        AND pt.campaign_id IS NULL
        ORDER BY pt.created_at;
        `;
    }

    getHospitalDonationsByHospitalId(hospitalId) {
        return `
        SELECT 
            pt.amount as amount,
            pt.first_name as donner_name,
            pt.email as donner_email,
            ht.name  as hospital_name,
            ht.phone_number as hospital_phone_number 
        FROM 
            payment_tb pt,
            hospital_tb ht 
        WHERE 
            pt.hospital_id = ${hospitalId}
        AND ht.id = ${hospitalId}
        AND pt.campaign_id IS NULL
        ORDER BY pt.created_at DESC;
        `;
    }

    getCampaignDonations() {
        return `
        SELECT 
            ht.name as hospital_name,
            ct.name as campaign_name,
            pt.amount as amount,
            pt.first_name as donner_name,
            ht.phone_number as hospital_phone_number,
            pt.email as donner_email
        FROM 
            payment_tb pt,
            campaign_tb ct,
            hospital_tb ht
        WHERE 
            pt.campaign_id = ct.id
        AND ct.hospital_id = ht.id 
        ORDER BY pt.created_at;
        `;
    }

    getCampaignDonationsByHospitalId(hospitalId) {
        return `
        SELECT 
            ht.name as hospital_name,
            ct.name as campaign_name,
            pt.amount as amount,
            pt.first_name as donner_name,
            ht.phone_number as hospital_phone_number,
            pt.email as donner_email
        FROM 
            payment_tb pt,
            campaign_tb ct,
            hospital_tb ht
        WHERE 
            pt.campaign_id = ct.id
        AND ct.hospital_id = ht.id 
        AND ht.id = ${hospitalId}
        ORDER BY pt.created_at;
        `;
    }

    getAllDonationsUS() {
        return `
        SELECT 
            SUM(pt.amount) as usd_total
        FROM 
            payment_tb pt
        WHERE pt.currency = 'USD'
        AND pt.pay_status = 'SUCCESS';
        `;
    }

    getAllDonationsLKR() {
        return `
        SELECT 
            SUM(pt.amount) as lkr_total
        FROM 
            payment_tb pt
        WHERE pt.currency = 'LKR'
        AND pt.pay_status = 'SUCCESS';
        `;
    }

    getDonationsByHospitalIdUSD(hospitalId) {
        return `
        SELECT 
            SUM(pt.amount) as usd_total
        FROM 
            payment_tb pt
        WHERE pt.currency = 'USD'
        AND pt.pay_status = 'SUCCESS'
        AND pt.hospital_id = ${hospitalId};
        `;
    }

    getDonationsByHospitalIdLKR(hospitalId) {
        return `
        SELECT 
            SUM(pt.amount) as lkr_total
        FROM 
            payment_tb pt
        WHERE pt.currency = 'LKR'
        AND pt.pay_status = 'SUCCESS'
        AND pt.hospital_id = ${hospitalId};
        `;
    }

    getDonationCampaignId(campaignId) {
        return `
        SELECT 
            SUM(pt.amount) as total_amount
        FROM 
            payment_tb pt
        WHERE pt.campaign_id = ${campaignId}
        AND pt.pay_status = 'SUCCESS';
        `;
    }
}

module.exports = new PaymentModel();
