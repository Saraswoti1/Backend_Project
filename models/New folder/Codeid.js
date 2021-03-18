const mongoose = require ('mongoose');

const idSchema = new mongoose.Schema({
  staffid:{
    type:String,
},
  docid:{
  type:String,
}
},
{timestamps:true})
module.exports =mongoose.model('Codeid',idSchema);
