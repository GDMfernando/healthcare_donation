'use strict';

const mainModel = require('../../libs/db/main_model.class');

class hospitalModel extends mainModel {
    constructor() {
        super('hospital_tb');
    }

    getAllHospitalCount() {
        return `
            SELECT COUNT(*) AS hospital_count FROM hospital_tb;
        `;
    }

    getHospitalCampaignCount(hospitalId) {
        return `
            SELECT COUNT(*) AS campaign_count FROM campaign_tb WHERE hospital_id = ${hospitalId};
        `;
    }

    getHospitalActiveCampaignCount(hospitalId) {
        return `
            SELECT COUNT(*) AS act_campaign_count FROM campaign_tb WHERE hospital_id = ${hospitalId} AND status = 'ACT';
        `;
    }
}

module.exports = new hospitalModel();
