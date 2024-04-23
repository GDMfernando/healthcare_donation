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

    findHospitalAdminUserById(userId) {
        return `
            SELECT 
                ht.id as hospital_id
            FROM 
                users_tb ut,
                hospital_tb ht
            WHERE ut.user_type = 'HOSPITAL_ADMIN'
            AND ut.id = ${userId}
            AND ut.status = 'ACT'
            AND ut.deleted_at IS NULL
            AND ht.user_id = ut.id
        `;
    }
}

module.exports = new authModel();
