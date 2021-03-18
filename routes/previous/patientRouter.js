const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const { Auth } = require('../Middleware/auth');


router.get('/details', Auth, (req, res) => {
    Patient.findById(req.user.id)
        .then((patients) => {
            res.json(patients);
        }).catch((err) => console.log(err));
})

.post('/register', (req, res, next) => {
    let { firstname, middlename, lastname, gmail, contactno,
        emcontact, marstatus, dob, nationality, paddress, taddress, username,
        password, role, myFile } = req.body;

    Patient.find({ username })
        .then(patient => {
            if (!patient) {

                throw new Error('User already exist');
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return next(err);
                Patient.create({
                    firstname, middlename, lastname, gmail, contactno,
                    emcontact, marstatus, dob, nationality, paddress, taddress, username,
                    password: hash, myFile, role
                })
                    .then(patient => {
                        res.status(201).json({"status":"Signup success"})
                     //   res.json({ status: "signup success" });
                    }).catch(next);
            })
        }).catch(function (err) {
            next(err)
        });
})
.post('/login', (req, res, next) => {
    const { username, password, } = req.body;
    Patient.findOne({ username })
        .then((patient) => {
            if (!patient) {
                let err = new Error('User  does not exist');
                err.status = 400;
                return next(err);
            }
            bcrypt.compare(password, patient.password)
                .then((isMatched) => {
                    if (!isMatched) {
                        let err = Error('Password doesnot match');
                        err.status = 400;
                        return next(err);
                    }
                    const payload = {
                        id: patient.id,
                        username: patient.username,
                        role: patient.role
                    }

                    jwt.sign(payload, process.env.SECRET, { expiresIn: '3hr' }, (err, token) => {
                        if (err) return next(err);
                        
                        res.json({ status: 'Login successfull', token:token });
                    })
                })
        }).catch(next);
})

.get('/detail', (req, res) => {
    Patient.find()
        .then((patients) => {
            res.json(patients);
        }).catch((err) => console.log(err));
})

.put('/details', Auth, (req, res, next) => {
    Patient.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true })
        .then((patient) => {
            res.json({
                firstname: patient.firstname, middlename: patient.middlename, lastname: patient.lastname, gmail: patient.gmail, contactno: patient.contactno,
                emcontact: patient.emcontact, marstatus: patient.marstatus, dob: patient.dob, nationality: patient.nationality,
                paddress: patient.paddress, taddress: patient.taddress,
                password: patient.password
            });
        })
});
 

module.exports = router;
