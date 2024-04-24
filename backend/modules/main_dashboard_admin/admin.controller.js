'use strict';

const httpResponse = require('../../libs/api_response/http_response');
const hospitalService = require('../../services/hospital/hospital.service');
const campaignService = require('../../services/campaign/campaign.service');

async function adminDash(req, res, next) {
    try {
        let cardsData = [];

        const hospitalData = req.body.addition ?? null;

        const allCampaignCount = await campaignService.getAllCampaignCount();
        const getAllActCount =
            await campaignService.getAllActiveCampaignCount();
        const allHospital = await hospitalService.getAllHospitalCount();

        if (hospitalData) {
            let hospitalCampaignCount =
                await hospitalService.getHospitalCampaignCount(
                    hospitalData?.hospital_id
                );
            let hospitalActiveCampaignCount =
                await hospitalService.getHospitalActiveCampaignCount(
                    hospitalData?.hospital_id
                );
            cardsData = [
                {
                    title: '123',
                    subtitle: 'Donation recived'
                },

                {
                    title: '$123',
                    subtitle: 'Donation Raised'
                },
                {
                    title: hospitalCampaignCount.success
                        ? hospitalCampaignCount.data[0].campaign_count
                        : 0,
                    subtitle: 'Campaigns'
                },
                {
                    title: hospitalActiveCampaignCount.success
                        ? hospitalActiveCampaignCount.data[0].act_campaign_count
                        : 0,
                    subtitle: 'Active Campaigns'
                }
            ];
        } else {
            cardsData = [
                {
                    title: '123',
                    subtitle: 'Donation recived'
                },

                {
                    title: '$123',
                    subtitle: 'Donation Raised'
                },
                {
                    title: allHospital.success
                        ? allHospital.data[0].hospital_count
                        : 0,
                    subtitle: 'Hospitals'
                },
                {
                    title: allCampaignCount.success
                        ? allCampaignCount.data[0].all_campaign_count
                        : 0,
                    subtitle: 'Campaigns'
                },
                {
                    title: getAllActCount.success
                        ? getAllActCount.data[0].act_campaign_count
                        : 0,
                    subtitle: 'Active Campaigns'
                }
            ];
        }

        httpResponse.success(res, 'ok', cardsData);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    adminDash
};
