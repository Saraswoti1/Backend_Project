const mongoose = require ('mongoose');
//staff registration
const staffSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required :true,
    },
    middlename:{     
        type: String,   
    },
    lastname:{
        type: String,
        required :true,
    },
    gmail:{
        type: String,
        required :true,
        minlength:6,
    },
    contactno:{
        type:String,
        required: true,
        minlength:7,
        maxlength: 10,
    },
    address:{
        type:String,
        required: true,
    },
    dep_name:{
        type: String,
        
    },
    username:{ 
        type: String,
        required :true,
        minlength:5,
        unique: true
    },
    password:{
        type:String,
        minlength:6,
        required: true
    },
    role:{
        type:String,  
        default: 'Staff',
    },
    image:{
        type:String
    }
},
{timestamps:true})
module.exports =mongoose.model('staff',staffSchema);