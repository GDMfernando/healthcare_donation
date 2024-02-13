'use strict';

const hospitalModel = require('./hospital.model');
const dbConnection = require('../../libs/db/mysql2.class');
const dbInstance = new dbConnection();

async function registerHospital(hospitalData) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = await hospitalModel.createQuery();
        const dbData = await dbInstance.create(dbQuery, hospitalData);
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

async function findHospitalById(hospitalId) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = hospitalModel.findByColumnQuery(
            'id',
            'id, name, address, phone_number, email, type'
        );
        const dbData = await dbInstance.find(dbQuery, hospitalId);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the hospital does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

async function getAllHospitals(){
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = await hospitalModel.getAllQuery('id, name, address, phone_number, email, type');
        const dbData = await dbInstance.all(dbQuery);
        if (dbData.success && dbData.data!== undefined) {
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

async function updateHospital(hospitalId, hospitalData){
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = await hospitalModel.updateQuery('id');
        const dbData = await dbInstance.update(dbQuery, [hospitalData, hospitalId]);
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

module.exports = {
    registerHospital,
    findHospitalById,
    getAllHospitals,
    updateHospital

};
