'use strict';

const router = require('express').Router();
const auth = require('./middlewares/auth/authHandler');
const apiEndPoint = '/api';

module.exports = (app) => {
    router.get(`${apiEndPoint}`, (req, res) => {
        res.json('Home automation API');
    });

    router.use(
        `${apiEndPoint}/users`,
        require('./modules/users/users.routes')(app)
    );

    // Admin View
    router.use(
        `${apiEndPoint}/admin`,
        auth.grant('SUPER_ADMIN'),
        require('./modules/main_dashboard_admin/admin.router')(app)
    );

    // Hospital View
    router.use(
        `${apiEndPoint}/hospital`,
        auth.grant('SUPER_ADMIN|HOSPITAL_ADMIN'),
        require('./modules/hospitals/hospitals.routes')(app)
    );

    router.use(
        `${apiEndPoint}/public/hospital`,
        require('./modules/hospitals/hospitals.routes')(app)
    );

    // Campaign View
    router.use(
        `${apiEndPoint}/campaign`,
        auth.grant('SUPER_ADMIN'),
        require('./modules/campaign/campaign.routes')(app)
    );

    router.use(
        `${apiEndPoint}/public/campaign`,
        require('./modules/campaign/campaign.routes')(app)
    );

    router.use(
        `${apiEndPoint}/idle`,
        auth.grant('SUPER_ADMIN|HOSPITAL_ADMIN'),
        (req, res, next) => {
            res.status(200).send({ error_code: null, message: 'ok' });
        }
    );

    router.use(
        `${apiEndPoint}/payment`,
        require('./modules/payment/payment.routes')(app)
    );

    router.use('*', (req, res, next) => {
        const invalidURL = {
            base_url: req.headers.host,
            route_path: req.originalUrl,
            message: 'URL routes path invalid'
        };
        res.status(404).json(invalidURL);
    });
    return router;
};
