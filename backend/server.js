'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

app.use(express.static('client'));
app.use(express.json());
app.use(
    cors({
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        key: 'userId',
        secret: 'subscribe',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24
        }
    })
);

const router = require('./router.js')(app);
app.use(router);

app.disable('x-powered-by');
app.disable('etag');

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});
