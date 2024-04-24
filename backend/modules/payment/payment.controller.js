'use strict';

const httpResponse = require('../../libs/api_response/http_response');
const {
    updatePayment,
    getCampaignDonations,
    getCampaignDonationsByHospitalId,
    getHospitalDonations,
    getHospitalDonationsByHospitalId
} = require('../../services/payment/payment.service');

async function updatePayStatus(req, res, next) {
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

async function getAllHospitalDonations(req, res, next) {
    const grantUser = req.body.granted_user;
    const addition = req.body.addition;

    try {
        let hospitalDonations = null;

        if (grantUser?.user_type === 'HOSPITAL_ADMIN') {
            hospitalDonations = await getHospitalDonationsByHospitalId(
                addition?.hospital_id
            );
        } else {
            hospitalDonations = await getHospitalDonations();
        }

        if (!hospitalDonations?.success) {
            return httpResponse.failed(res, hospitalDonations.error);
        }

        return httpResponse.success(
            res,
            'Hospital donations fetched successfully',
            hospitalDonations.data
        );
    } catch (error) {
        console.error('Error getting hospital donations:', error);
        return httpResponse.serverError(
            res,
            'Error getting hospital donations'
        );
    }
}

async function getAllCampaignDonations(req, res, next) {
    try {
        const grantUser = req.body.granted_user;
        const addition = req.body.addition;
        let campaignDonations = null;

        if (
            grantUser?.user_type === 'HOSPITAL_ADMIN' &&
            addition?.hospital_id
        ) {
            campaignDonations = await getCampaignDonationsByHospitalId(
                addition?.hospital_id
            );
        } else {
            campaignDonations = await getCampaignDonations();
        }

        if (!campaignDonations?.success) {
            return httpResponse.failed(res, campaignDonations.error);
        }

        return httpResponse.success(
            res,
            'Campaign donations fetched successfully',
            campaignDonations.data
        );
    } catch (error) {
        console.error('Error getting campaign donations:', error);
        return httpResponse.serverError(
            res,
            'Error getting campaign donations'
        );
    }
}

module.exports = {
    updatePayStatus,
    getHospitalDonations,
    getCampaignDonations,
    getAllHospitalDonations,
    getAllCampaignDonations
};
