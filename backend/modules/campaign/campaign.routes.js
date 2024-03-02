'use strict';

const router = require('express').Router();
const campaignController = require('./campaign.controller.js');
const {upload} = require('../../config/constant.js');

router.get('/public/all', campaignController.getAllCampaigns);

module.exports = (app) => {
    router.post('/register', upload.single('image'), campaignController.campaignRegister);
    router.post('/update/:id', campaignController.campaignUpdate);
    router.get('/get/:id', campaignController.getCampaignById);
    router.get('/all', campaignController.getAllCampaigns);
    router.get('/delete/:id', campaignController.deleteCampaignById);
    app.use('/api/campaign', router);
    return router;
};
