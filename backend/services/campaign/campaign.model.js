'use strict';

const mainModel = require('../../libs/db/main_model.class');

class campaignModel extends mainModel {
    constructor() {
        super('campaign_tb');
    }
}

module.exports = new campaignModel();
