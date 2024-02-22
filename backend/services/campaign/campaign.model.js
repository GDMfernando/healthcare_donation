'use strict';

const mainModel = require('../../libs/db/main_model.class');

class campaignModel extends mainModel {
    constructor() {
        super('campaign_tb');
    }

    getAllCampaign() {
        return `SELECT ct.*, ht.name AS hospital_name FROM campaign_tb AS ct 
        INNER JOIN hospital_tb AS ht ON ht.id = ct.hospital_id;`;
    }


    getAllCampaignCount(){
        return `
            SELECT COUNT(*) AS all_campaign_count FROM campaign_tb ct;
        `
    }

    getAllActiveCampaignCount(){
        return `
            SELECT COUNT(*) AS act_campaign_count FROM campaign_tb WHERE status = 'ACT';
        `
    }
}

module.exports = new campaignModel();
