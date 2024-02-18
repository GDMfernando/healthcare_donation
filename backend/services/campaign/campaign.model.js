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
}

module.exports = new campaignModel();
