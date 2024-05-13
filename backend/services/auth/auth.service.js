const authModel = require('./auth.model');
const dbConnection = require('../../libs/db/mysql2.class');
const dbInstance = new dbConnection();

// Function to find a user by their ID
function findUserById(userId) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = authModel.findByColumnQuery(
            'id',
            'username, user_type, first_name, last_name, login_email, status'
        );
        const dbData = dbInstance.find(dbQuery, userId);
        if (dbData.success) {
            returnData.success = true;
            returnData.data = dbData.data;
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

// Function to find a user by their ID and user type
async function findUserByIdAndUserType(userId, userType) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = authModel.findUserByIdAndUserType(userId, userType);
        const dbData = await dbInstance.queryExecute(dbQuery);
        if (dbData.success) {
            returnData.success = true;
            returnData.data = dbData.data;
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

// Function to find a hospital admin user by their ID
async function findHospitalAdminUserById(userId) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = authModel.findHospitalAdminUserById(userId);
        const dbData = await dbInstance.queryExecute(dbQuery);
        if (dbData.success) {
            returnData.success = true;
            returnData.data = dbData.data;
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findUserById,
    findUserByIdAndUserType,
    findHospitalAdminUserById
};
