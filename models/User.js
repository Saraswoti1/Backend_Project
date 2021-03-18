const mongoose = require ('mongoose');
//User Schema
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required :true,
    },
    lastname:{
        type: String,
        required :true,
    },
    username:{
        type: String,
        required :true,
    },
    contactno:{
        type:String,
        required: true,
        minlength:7,
        maxlength: 10,
    },
    email:{
        type:String,
        required :true
    },
    address:{
        type:String,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    myFile: {
        type: String,
    },
},
{timestamps:true})
module.exports =mongoose.model('User',userSchema);



