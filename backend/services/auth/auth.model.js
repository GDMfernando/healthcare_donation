'use strict';

const mainModel = require('../../libs/db/main_model.class');

class authModel extends mainModel {
    constructor() {
        super('users_tb');
    }

    findUserByIdAndUserType(userId, userType) {
        return `
            SELECT 
                first_name,
                last_name,
                login_email
            FROM 
                users_tb
            WHERE 
                id = ${userId}
            AND 
                user_type = '${userType}'
            AND status = 'ACT'
            AND deleted_at IS NULL
        `;
    }
}

module.exports = new authModel();
