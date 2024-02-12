'use strict';

const mysql = require('mysql2/promise');
const keys = require('../../config/keys');

function createPoolConnection() {
    try {
        const promisePool = mysql.createPool({
            host: keys.databaseHost,
            user: keys.databaseUsername,
            password: keys.databasePassword,
            database: keys.database,
            connectionLimit: 10,
            waitForConnections: true,
            queueLimit: 0
        });

        return promisePool;
    } catch (err) {
        throw err;
    }
}

const pool = createPoolConnection();

module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params) => pool.execute(...params)
};
