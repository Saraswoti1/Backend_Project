const express = require('express');
const guestRouter = express.Router();
const guest = require('../models/Guest');

guestRouter.get('/guest', (req, res) => {
    guest.find()
        .then((guests) => {
            res.json(guests);
        }).catch((err) => console.log(err));
});
guestRouter.post('/guest', (req, res, next) => {
    let { fullname, guardname, contactno, address, age, alt_contact, desc, adoc } = req.body;

    guest.create({ fullname, guardname, contactno, address, age, alt_contact, desc, adoc })
        .then(guests => {
            res.status(201).json({"status":"Patient added successfully"})
           // res.json({ status: "insert success" });
        }).catch((err) => console.log(err));
});

module.exports = guestRouter;