const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../../database')

router.use(express.json());
db.connect();

router.route('/').get((req, res) => {

    const sql = `select * from user`;

    db.query(sql, (error, results) => {
        if (error) throw error;
        res.status(200).send(results);
    });

});

router.route('/').post((req, res) => {

    const userSchema = Joi.object({
       username: Joi.string().min(4).required(),
       password: Joi.string().min(4).required(),
       firstName: Joi.string().min(3).required(),
       lastName: Joi.string().min(3)
    });

    const user = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    const { error } = userSchema.validate(user);

    if (error) {
        res.status(400).send({message: error.message});
        return;
    }

    const sql = `insert into user(username, password, first_name, last_name) value(?, ?, ?, ?)`;
    const values = [user.username, user.password, user.firstName, user.lastName];

    db.query(sql, values, (error, results) => {
        if (error.code === 'ER_DUP_ENTRY') return res.status(400).send({message: `username '${user.username}' already exists`});
        res.status(201).send(Object.assign(user, {id: results.insertId}));
    });
});

module.exports = router;