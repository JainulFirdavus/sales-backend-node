var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
    username: { type: String, lowercase: true, trim: true },
    email: { type: String, lowercase: true, index: { unique: true }, trim: true },
    firstname: String,
    lastname: String,
    password: String,
    phone: { type: String},
    address: String,
    branch: String,
    role: String,
    position: String,
    grade: String,
    qualification: String,
    professional: String,
    blood_group: String,
    health_issues: String,
    basic_pay: { type: Number },
    hra_amount: { type: Number },
    pf_amount: { type: Number },
    da_amount: { type: Number },
    joining_date: { type: Number },
    relieving_date: { type: Number },
    relieving_reason: { type: String },
    last_login: { type: Number },
    last_logout: { type: Number },
    status: { type: Number, default: 0 }
}, { timestamps: true, versionKey: false });

schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var employee = mongoose.model('employee', schema, 'employee');
module.exports = employee;
