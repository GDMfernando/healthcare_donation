'use strict';

const usersModel = require('./users.model');
const dbConnection = require('../../libs/db/mysql2.class');
const dbInstance = new dbConnection();

async function registerUser(userData) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = await usersModel.createQuery();
        const dbData = await dbInstance.create(dbQuery, userData);
        if (dbData.success) {
            returnData.success = true;
            returnData.data = dbData.data.insertId;
        } else {
            throw 'Internal server error : DB query Executing error';
        }
    } catch (error) {
        throw error;
    }
    return returnData;
}

async function findUserByUsername(username) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = usersModel.findByColumnQuery(
            'username',
            'id, username, password, user_type, first_name'
        );
        const dbData = await dbInstance.find(dbQuery, username);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the username you entered does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    findUserByUsername
};
