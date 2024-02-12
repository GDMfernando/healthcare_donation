'use strict';

const dbConnection = require('./db_connection');

class mySql2PromisesClass {
    async create(query, data) {
        try {
            const connection = await dbConnection.connection();
            try {
                await connection.beginTransaction();
                const [rows] = await connection.query(query, [data]);
                await connection.commit();
                return { success: true, data: rows };
            } catch (err) {
                await connection.rollback();
                throw err;
            } finally {
                await connection.release();
            }
            return { success: false };
        } catch (err) {
            throw err;
        }
    }

    async update(query, data) {
        try {
            const connection = await dbConnection.connection();
            try {
                await connection.beginTransaction();
                const [rows] = await connection.query(query, data);
                await connection.commit();
                return { success: true, data: rows };
            } catch (err) {
                await connection.rollback();
                throw err;
            } finally {
                await connection.release();
            }
            return { success: false };
        } catch (err) {
            throw err;
        }
    }

    async delete(query, id) {
        try {
            const connection = await dbConnection.connection();
            try {
                await connection.beginTransaction();
                const [rows] = await connection.query(query, [id]);
                await connection.commit();
                return { success: true, data: rows };
            } catch (ex) {
                await connection.rollback();
                throw ex;
            } finally {
                await connection.release();
            }
            return { success: false };
        } catch (err) {
            throw err;
        }
    }

    async find(query, ids) {
        try {
            const connection = await dbConnection.connection();
            try {
                await connection.beginTransaction();
                let [findOne] = await connection.query(query, [ids]);
                await connection.commit();
                return { success: true, data: findOne[0] };
            } catch (err) {
                throw err;
            } finally {
                await connection.release();
            }
            return { success: false };
        } catch (err) {
            throw err;
        }
    }

    async all(query) {
        try {
            const connection = await dbConnection.connection();
            try {
                await connection.beginTransaction();
                let all = await connection.query(query);
                await connection.commit();
                return { success: true, data: all[0] };
            } catch (err) {
                throw err;
            } finally {
                await connection.release();
            }
            return { success: false };
        } catch (err) {
            throw err;
        }
    }

    async queryExecute(query) {
        try {
            const connection = await dbConnection.connection();
            try {
                await connection.beginTransaction();
                let all = await connection.query(query);
                await connection.commit();
                return { success: true, data: all[0] };
            } catch (err) {
                throw err;
            } finally {
                await connection.release();
            }
            return { success: false };
        } catch (err) {
            throw err;
        }
    }
}
module.exports = mySql2PromisesClass;
