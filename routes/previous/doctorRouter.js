const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const { Auth } = require('../Middleware/auth');


router.get('/details', (req, res) => {
    Doctor.find()
        .then((doctors) => {
            res.json(doctors);
        }).catch((err) => console.log(err));
});

router.post('/register', (req, res, next) => {
    let { firstname, middlename, lastname, gmail, contactno,
        emcontact, dob, address, specialist, username,
        password, role, slogan, myFile } = req.body;
 
    Doctor.find({ username })
        .then(doctor => {
            if (!doctor) {
                throw new Error('User already exist');
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return next(err);
                Doctor.create({
                    firstname, middlename, lastname, gmail, contactno,
                    emcontact, dob, address, specialist, username,
                    password: hash, role, slogan, myFile
                })
                    .then(doctor => {
                        res.json({ status: "Signup success" });
                    }).catch(next);
            })
        }).catch(function (err) {
            next(err)
        });
});

router.post('/login', (req, res, next) => {
    const { username, password, } = req.body;
    Doctor.findOne({ username })
        .then((doctor) => {
            if (!doctor) {
                let err = new Error('User  does not exist');
                err.status = 400;
                return next(err);
            }
            bcrypt.compare(password, doctor.password)
                .then((isMatched) => {
                    if (!isMatched) {
                        let err = Error('Password doesnot match');
                        err.status = 400;
                        return next(err);
                    }
                    const payload = {
                        id: doctor.id,
                        username: doctor.username,
                        role: doctor.role
                    }
                    jwt.sign(payload, process.env.SECRET, { expiresIn: '3hr' }, (err, token) => {
                        if (err) return next(err);
                        res.json({ message: 'Login successfull', token });
                    })
                })
        }).catch(next);
});

router.put('/details', Auth, (req, res, next) => {
    Doctor.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true })
        .then((doctor) => {
            res.json({
                firstname: doctor.firstname, middlename: doctor.middlename, lastname: doctor.lastname, gmail: doctor.gmail, contactno: doctor.contactno,
                emcontact: doctor.emcontact, address: doctor.address, specialist: doctor.specialist, department: doctor.department,
                qualification: doctor.qualification, username: doctor.username
            });
        })
});

module.exports = router;
