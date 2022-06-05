const express = require('express');
const mysql = require('mysql');
const db_connection = require('./database');

require('dotenv/config');

const app = express();
app.use(express.json());

const userRouter = require('./routes/Users');

app.use('/', express.static('public'));
app.use('/Users', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`server started at http://localhost:${process.env.PORT}`);
});