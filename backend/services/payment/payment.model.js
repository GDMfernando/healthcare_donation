'use strict';

const mainModel = require('../../libs/db/main_model.class');

class PaymentModel extends mainModel {
    constructor() {
        super('payment_tb');
    }
}

module.exports = new PaymentModel();
