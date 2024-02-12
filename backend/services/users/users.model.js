'use strict';

const mainModel = require('../../libs/db/main_model.class');

class usersModel extends mainModel {
    constructor() {
        super('users_tb');
    }
}

module.exports = new usersModel();
