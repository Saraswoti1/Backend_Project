const express = require('express');
const appointment = require('../models/Appointment');
const { Auth } = require('../Middleware/auth');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        appointment.find()
            .then((appointments) => {
                res.json(appointments);

            }).catch((err) => console.log(err));
    })
    .post(Auth, (req, res, next) => {
        console.log(req.body);
        let { pname, date, time, desc, doctor } = req.body;
        appointment.create({ pname, date, time, desc, doctor, user: req.user.id })
            .then(appointment => {
                console.log(appointment);
                res.status(201).json({"status":"insert success"})
              //  res.json({ status: "insert success" });
            }).catch((err) => console.log(err));
    });

module.exports = router;