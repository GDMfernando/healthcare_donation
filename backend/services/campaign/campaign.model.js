'use strict';

const mainModel = require('../../libs/db/main_model.class');

class campaignModel extends mainModel {
    constructor() {
        super('campaign_tb');
    }

    // Method to get all campaigns with associated hospital names
    getAllCampaign() {
        return `SELECT ct.*, ht.name AS hospital_name FROM campaign_tb AS ct 
        INNER JOIN hospital_tb AS ht ON ht.id = ct.hospital_id;`;
    }

    // Method to get the count of all campaigns
    getAllCampaignCount() {
        return `
            SELECT COUNT(*) AS all_campaign_count FROM campaign_tb ct;
        `;
    }

    // Method to get the count of all active campaigns
    getAllActiveCampaignCount() {
        return `
            SELECT COUNT(*) AS act_campaign_count FROM campaign_tb WHERE status = 'ACT';
        `;
    }

    // Method to get all campaigns associated with a specific hospital ID
    getAllCampaignByHospitalId(hospitalId) {
        return `
        SELECT ct.*, ht.name AS hospital_name FROM campaign_tb AS ct 
        INNER JOIN hospital_tb AS ht ON ht.id = ct.hospital_id
        WHERE ct.hospital_id = ${hospitalId}`;
    }
}

module.exports = new campaignModel();
