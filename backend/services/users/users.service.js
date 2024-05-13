'use strict';

const usersModel = require('./users.model');
const dbConnection = require('../../libs/db/mysql2.class');
const dbInstance = new dbConnection();

// Function to register a new user
async function registerUser(userData) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const alreadyExits = await findUserByUsername(userData.username);
        if (!alreadyExits.success) {
            const dbQuery = await usersModel.createQuery();
            const dbData = await dbInstance.create(dbQuery, userData);
            if (dbData.success) {
                returnData.success = true;
                returnData.data = dbData.data.insertId;
            } else {
                throw 'Internal server error : DB query Executing error';
            }
        } else {
            returnData.success = false;
            returnData.error = 'username already exits..!';
        }
    } catch (error) {
        throw error;
    }
    return returnData;
}

// Function to find a user by username
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
