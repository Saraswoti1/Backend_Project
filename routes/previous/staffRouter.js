const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');
const { Auth } = require('../Middleware/auth');

router.get('/details', (req, res) => {
    Staff.find()
        .then((staffs) => {
            res.json(staffs);
        }).catch((err) => console.log(err));
});

router.post('/register', (req, res, next) => {
    let { firstname, middlename, lastname, gmail, contactno,
        address, username,
        password, dep_name, role } = req.body;

    Staff.find({ username })
        .then(staff => {
            if (!staff) {
                throw new Error('User already exist');
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    throw new Error("Password was not encrypt");
                }
                //return next(err);
                Staff.create({
                    firstname, middlename, lastname, gmail, contactno,
                    address, username,
                    password: hash, dep_name, role
                })
                    .then(staff => {
                        res.json({ status: "Signup success" });
                    }).catch(next);
            })
        }).catch(function (err) {
            next(err)
        });
});

router.post('/login', (req, res, next) => {
    const { username, password, } = req.body;
    Staff.findOne({ username })
        .then((staff) => {
            if (!staff) {
                let err = new Error('User  does not exist');
                err.status = 400;
                return next(err);
            }
            bcrypt.compare(password, staff.password)
                .then((isMatched) => {
                    if (!isMatched) {
                        let err = Error('Password does not match');
                        err.status = 400;
                        return next(err);
                    }
                    const payload = {
                        id: staff.id,
                        username: staff.username,
                        role: staff.role
                    }
                    jwt.sign(payload, process.env.SECRET, { expiresIn: '3hr' }, (err, token) => {
                        if (err) return next(err);
                        res.json({ message: 'Login successfull', token });
                    })
                })
        }).catch(next);
})

router.put('/details', Auth, (req, res, next) => {
    Staff.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true })
        .then((staff) => {
            res.json({
                firstname: staff.firstname, middlename: staff.middlename, lastname: staff.lastname, gmail: staff.gmail, contactno: staff.contactno, dep_name: staff.dep_name,
                address: staff.address
            });
        })
});


module.exports = router;




