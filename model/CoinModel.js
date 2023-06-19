const  mongoose = require("mongoose")

const Schema = mongoose.Schema
 const coinSchema = new Schema({
    "exchange_id": {
        type: String,
        required: 'cannot be blank'
    },
    "website": {
        type: String,
    },
    "name": {
        type: String,
    },
    "data_start": {
        type: String,
    },
    "data_end": {
        type: String,
    },
    "data_quote_start": {
        type: String,
    },
    "data_quote_end": {
        type: String,
    },
    "data_orderbook_start": {
        type: String,
    },
    "data_orderbook_end": {
        type: String,
    },
    "data_trade_start": {
        type: String,
    },
    "data_trade_end": {
        type: String,
    },
    "data_symbols_count": {
        type: Number,
    },
    "volume_1hrs_usd":{
        type: Number,
    },
    "volume_1day_usd": {
        type: Number,
    },
    "volume_1mth_usd": {
        type: Number,
    },
    "url": {
        type: String,
        default: "null"
    }
})
module.exports= coinSchema