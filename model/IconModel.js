const  mongoose = require("mongoose")

const Schema = mongoose.Schema
 const iconSchema = new Schema({
    "exchange_id": {
    type: String,
    required: 'cannot be blank'
},
    "url": {
        type: String,
    },
   
})
module.exports= iconSchema