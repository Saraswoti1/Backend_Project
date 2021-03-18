const mongoose = require ('mongoose');
//emergency staff  entry by staff 
const guestSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required :true,
    },
    guardname:{
        type: String,
        required :true,
    },
    contactno:{
        type:String,
        required: true,
        minlength:7,
        maxlength: 10,
    },
    address:{
        type:String,
    },
    age:{
        type:String,
    },
    alt_contact:{
        type:String,
        minlength:7,
        maxlength: 10,
    },
    desc:{
        type:String
    },
    adoc:{
        type:String,
        Enum:["Dr Saraswoti Luitel","Dr Sabita Luitel"
        ]
    },
    appoit_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Staff'
    }
},
{timestamps:true})
module.exports =mongoose.model('Guest',guestSchema);



