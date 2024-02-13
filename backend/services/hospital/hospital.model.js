'use strict';

const mainModel = require('../../libs/db/main_model.class');

class hospitalModel extends mainModel {
    constructor() {
        super('hospital_tb');
    }
}

module.exports = new hospitalModel();
