const mongoose = require('mongoose');
const medreportSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
    },
    date: {
        type: Date,
        required: true,
    },
    bloodglucose: {
        type: String,
        required: true,
    },

    hemoglobin: {
        type: String,
        required: true,
    },
    wbc: {
        type: String,
        required: true,
    },
    thyroidt3: {
        type: String,
        required: true,
    },
    thyroidt4: {
        type: String,
        required: true,
    },
    thyroidtTSH: {
        type: String,
        required: true,
    },
    blooddesc: {
        type: String,
        required: true,
    },
    systolic: {
        type: String,
        required: true,
    },
    diastolic: {
        type: String,
        required: true,
    },
    averagebp: {
        type: String,
        required: true,
    },
    bloodbppdesc: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    reaction: {
        type: String,
        required: true,
    },
    apperance: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    //upload by doctor or staff 
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
    },
    //upload by doctor or staff
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    }
},
    { timestamps: true })
module.exports = mongoose.model('Medreport', medreportSchema);


