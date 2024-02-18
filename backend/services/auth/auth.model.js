'use strict';

const mainModel = require('../../libs/db/main_model.class');

class authModel extends mainModel {
    constructor() {
        super('users_tb');
    }

    findUserByIdAndUserType(userId, userType) {
        const rolesArray = userType
            .split('|')
            .map((role) => `'${role.trim()}'`)
            .join(', ');

        return `
            SELECT 
                first_name,
                last_name,
                login_email
            FROM 
                users_tb
            WHERE user_type
                IN (${rolesArray})
            AND id = ${userId}
            AND status = 'ACT'
            AND deleted_at IS NULL
        `;
    }
}

module.exports = new authModel();
