const mongoose = require('mongoose');

const appointSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        
    }

}, { timestamps: true })
module.exports = mongoose.model('Appointment', appointSchema);
