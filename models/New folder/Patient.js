const mongoose = require('mongoose');
//patient registration
const patientSchema = new mongoose.Schema({
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
    marstatus: {
        type: String,

        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    paddress: {
        type: String,
        required: true,
    },
    taddress: {
        type: String,
        required: true,
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
        default: 'Patient',
    },
    myFile: {
        type: String,
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    },
    medreport:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medreport",
    }

},
    { timestamps: true })
module.exports = mongoose.model('Patient', patientSchema);