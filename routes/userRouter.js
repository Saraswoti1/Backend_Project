const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Auth } = require('../Middleware/auth');


router.get('/details', Auth, (req, res) => {
    User.findById(req.user.id)
        .then((users) => {
            res.json(users);
        }).catch((err) => console.log(err));
})

    .post('/register', (req, res, next) => {
        let { firstname, lastname, contactno, username, password, email, address, myFile } = req.body;

        User.find({ username })
            .then(user => {
                if (!user) {
                    throw new Error('Username already exist');
                }

                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) return next(err);
                    User.create({
                        firstname, lastname, contactno, username, email, address,
                        password: hash, myFile,
                    })
                        .then(user => {
                            res.status(201).json({ "status": "Signup success" })
                            //   res.json({ status: "signup success" });
                        }).catch(next);
                })
            }).catch(function (err) {
                next(err)
            });
    })
    .post('/login', (req, res, next) => {
        const { username, password } = req.body;
        User.findOne({ username })
            .then((user) => {
                if (!user) {
                    let err = new Error('User  does not exist');
                    err.status = 400;
                    return next(err);
                }
                bcrypt.compare(password, user.password)
                    .then((isMatched) => {
                        if (!isMatched) {
                            let err = Error('Password doesnot match');
                            err.status = 400;
                            return next(err);
                        }
                        const payload = {
                            id: user.id,
                            username: user.username,

                        }

                        jwt.sign(payload, process.env.SECRET, { expiresIn: '3hr' }, (err, token) => {
                            if (err) return next(err);

                            res.json({ status: 'Login successfull', token: token });
                        })
                    })
            }).catch(next);
    })

    .get('/detail', (req, res) => {
        User.find()
            .then((users) => {
                res.json(users);
            }).catch((err) => console.log(err));
    })

    .put('/details', Auth, (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true })
            .then((user) => {
                res.json({
                    firstname: user.firstname, lastname: user.lastname, email: user.email, contactno: user.contactno,
                    address: user.address,
                    password: user.password
                });
            })
    });


module.exports = router;
