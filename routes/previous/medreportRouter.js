const express = require('express');
const medreport = require('../models/Medreport');
const path = require('path');
const router = express.Router();

router.route('/medreport')
    .get((req, res) => {
        medreport.find()
            .then((medreports) => {
                res.json(medreports);

            }).catch((err) => console.log(err));
    });

router.post('/medreport', (req, res, next) => {
    console.log(req.body);
    let { username, date, bloodglucose, hemoglobin, wbc, thyroidt3, thyroidt4, thyroidtTSH,
        blooddesc, systolic, diastolic, averagebp, bloodbppdesc, color, reaction, apperance, desc } = req.body;

    medreport.create({
        username, date, bloodglucose, hemoglobin, wbc, thyroidt3, thyroidt4, thyroidtTSH,
        blooddesc, systolic, diastolic, averagebp, bloodbppdesc, color, reaction, apperance, desc
    })
        .then(medreports => {
            console.log(medreports);
            res.status(201).json({ "status": "Report insertion success" })
            // res.json({ status: "insert success" });
        }).catch((err) => console.log(err));
});
module.exports = router;