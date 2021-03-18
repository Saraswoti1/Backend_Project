const mongoose = require('mongoose');

//DOCTOR registration
const doctSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    contactno: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 10,
    },
    emcontact: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 10,
    },
    dob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    specialist: {
        type: String,

    },
    department: {
        type: String,
    },
    qualification: {
        type: String,
    },
    experience: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        enum: ['Doctor', 'Patient', 'Staff'],
        default: 'Doctor',
    },
    slogan: {
        type: String,
    },
    myFile: {
        type: String,
    },
    appointment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    }]
},
    { timestamps: true })
module.exports = mongoose.model('Doctor', doctSchema);
