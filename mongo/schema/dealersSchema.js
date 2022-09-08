var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
   name:{type:String},
   phone:{type:String},
   tin:{type:String},
   address:{type:String},
    postal:{type:String},
}, { timestamps: true, versionKey: false });



var dealers = mongoose.model('dealers', schema, 'dealers');
module.exports = dealers;
