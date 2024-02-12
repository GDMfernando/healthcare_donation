'use strict';

function failed(res, errors = [], httpCode = 401) {
    res.headers = {
        'cache-control': 'no-store',
        Pragma: 'no-cache'
    };
    const resp = {
        success: 0,
        errors: errors,
        code: 'FAILED'
    };
    res.status(httpCode).json(resp);
}

function success(res, message, data = [], httpCode = 200) {
    res.headers = {
        'cache-control': 'no-store',
        Pragma: 'no-cache'
    };
    const resp = {
        success: 1,
        code: 'SUCCESS',
        message: message,
        results: data,
        errors: []
    };
    res.status(httpCode).json(resp);
}

module.exports = {
    failed,
    success
};
