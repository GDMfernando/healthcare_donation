'use strict';

const campaignModel = require('./campaign.model');
const dbConnection = require('../../libs/db/mysql2.class');
const dbInstance = new dbConnection();

async function registerCampaign(campaignData) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = await campaignModel.createQuery();
        const dbData = await dbInstance.create(dbQuery, campaignData);
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

async function findCampaignById(campaignId) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = campaignModel.findByColumnQuery(
            'id',
            'id, hospital_id, name, patient_name, target, description, image'
        );
        const dbData = await dbInstance.find(dbQuery, campaignId);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the campaign does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

async function getAllCampaign() {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = campaignModel.getAllCampaign();
        const dbData = await dbInstance.queryExecute(dbQuery);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the campaign does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

async function updateCampaign(campaignId, campaignData) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = await campaignModel.updateQuery('id');
        const dbData = await dbInstance.update(dbQuery, [
            campaignData,
            campaignId
        ]);
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

async function deleteCampaignById(id) {
    let returnData = {
        success: false,
        data: null
    };
    try {
        const dbQuery = await campaignModel.deleteQuery('id');
        const dbData = await dbInstance.delete(dbQuery, id);
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

async function getAllCampaignCount() {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = await campaignModel.getAllCampaignCount();
        const dbData = await dbInstance.queryExecute(dbQuery);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the campaign does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

async function getAllActiveCampaignCount() {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = await campaignModel.getAllActiveCampaignCount();
        const dbData = await dbInstance.queryExecute(dbQuery);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the campaign does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

async function getAllCampaignByHospitalId(hospitalId) {
    let returnData = {
        success: false,
        data: null,
        error: null
    };
    try {
        const dbQuery = campaignModel.getAllCampaignByHospitalId(hospitalId);
        const dbData = await dbInstance.queryExecute(dbQuery);
        if (dbData.success && dbData.data !== undefined) {
            returnData.success = true;
            returnData.data = dbData.data;
        } else {
            returnData.error =
                'Sorry, the campaign does not match our records.';
        }
        return returnData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerCampaign,
    findCampaignById,
    getAllCampaign,
    updateCampaign,
    deleteCampaignById,
    getAllCampaignCount,
    getAllActiveCampaignCount,
    getAllCampaignByHospitalId
};
