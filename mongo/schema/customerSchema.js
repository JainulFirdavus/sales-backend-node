var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
Schema = mongoose.Schema;
var schema = mongoose.Schema({ 
    phone: { type: String, index: { unique: true } },
    name: String, 
    address: String,
    status: { type: Number, default: 1 },
    zipCode:String,
    email:String
    
}, { timestamps: true, versionKey: false });

schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var customers = mongoose.model('customers', schema, 'customers');
module.exports = customers;
