'use strict';
const {
    validateCampaignRegistration,
    validateCampaignUpdate
} = require('./campaign.request.validate.js');
const httpResponse = require('../../libs/api_response/http_response');
const campaignService = require('../../services/campaign/campaign.service.js');
const userService = require('../../services/users/users.service');
const paymentService = require('../../services/payment/payment.service');
const { encodeImageToBase64, hashPassword } = require('../../utils/helper.js');
const uuid = require('uuid');

// Controller function to register a campaign
async function campaignRegister(req, res, next) {
    try {
        // Validate the incoming request data
        const validate = validateCampaignRegistration(req);
        if (!validate) {
            let campaignReqData = {
                hospital_id: req.body.hospital_id,
                name: req.body.name,
                patient_name: req.body.patient_name,
                target: req.body.target,
                description: req.body.description,
                image: req.file ? req.file.filename : null
            };

            // Register the campaign
            const campaignRegisterResp = await campaignService.registerCampaign(
                campaignReqData
            );
            if (campaignRegisterResp.success) {
                httpResponse.success(
                    res,
                    'Successfully Registered',
                    campaignRegisterResp.data
                );
            } else {
                httpResponse.failed(res, 'Campaign registration error');
            }
        } else {
            httpResponse.failed(res, validate);
        }
    } catch (error) {
        throw error;
    }
}

// Controller function to update a campaign
async function campaignUpdate(req, res, next) {
    try {
        let campaignId = req.params.id;
        // const validate = validateCampaignUpdate(req);
        if (true) {
            let campaignReqData = {
                hospital_id: req.body.hospital_id,
                name: req.body.name,
                patient_name: req.body.patient_name,
                target: req.body.target,
                description: req.body.description
                // image: req.file? req.file.filename : null
            };
            // Update the campaign
            const campaignUpdateResp = await campaignService.updateCampaign(
                campaignId,
                campaignReqData
            );
            if (campaignUpdateResp.success) {
                httpResponse.success(
                    res,
                    'Successfully updated',
                    campaignUpdateResp.data
                );
            } else {
                httpResponse.failed(
                    res,
                    'Internal server error : Campaign update failed'
                );
            }
        } else {
            httpResponse.failed(res, validate);
        }
    } catch (error) {
        throw error;
    }
}

// Controller function to get a campaign by ID
async function getCampaignById(req, res, next) {
    try {
        let campaignId = req.params.id;
        const getCampaignResp = await campaignService.findCampaignById(
            campaignId
        );
        if (getCampaignResp.success) {
             // Add base64-encoded image to response data
            getCampaignResp.data = {
                ...getCampaignResp.data,
                image_base64: getCampaignResp.data.image
                    ? encodeImageToBase64(
                          'uploads/' + getCampaignResp.data.image
                      )
                    : null
            };
            httpResponse.success(res, 'Successfully', getCampaignResp.data);
        } else {
            httpResponse.failed(res, getCampaignResp.error);
        }
    } catch (error) {
        throw error;
    }
}

// Controller function to get all campaigns
async function getAllCampaigns(req, res, next) {
    const grantUser = req.body.granted_user;
    const addition = req.body.addition;

    try {
        let getAllCampaignResp = null;
        let paymentData = null;
        if (
            grantUser?.user_type === 'HOSPITAL_ADMIN' &&
            addition?.hospital_id
        ) {
            getAllCampaignResp =
                await campaignService.getAllCampaignByHospitalId(
                    addition?.hospital_id
                );
        } else {
            // Get all campaigns
            getAllCampaignResp = await campaignService.getAllCampaign();
            if (getAllCampaignResp.success) {
                // Get donation data for each campaign
                const temp = await Promise.all(
                    getAllCampaignResp.data.map(async (campaign) => {
                        const paymentData =
                            await paymentService.getDonationCampaignId(
                                campaign.id
                            );
                        campaign.raised = paymentData;
                        return campaign;
                    })
                );
                getAllCampaignResp.data = temp;
            }
        }

        if (
            getAllCampaignResp &&
            getAllCampaignResp.success &&
            getAllCampaignResp.data &&
            getAllCampaignResp.data.length > 0
        ) {
            getAllCampaignResp.data.forEach((campaign) => {
                campaign['image_base64'] = campaign.image
                    ? encodeImageToBase64('uploads/' + campaign.image)
                    : null;
            });
            httpResponse.success(res, 'Successfully', getAllCampaignResp.data);
        } else {
            httpResponse.failed(res, getAllCampaignResp.error);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteCampaignById(req, res, next) {
    try {
        let cId = req.params.id;
        const getResp = await campaignService.deleteCampaignById(cId);
        if (getResp.success) {
            httpResponse.success(res, 'Deleted Successfully', getResp.data);
        } else {
            httpResponse.failed(res, getResp.error, 400);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    campaignRegister,
    campaignUpdate,
    getCampaignById,
    getAllCampaigns,
    deleteCampaignById
};
