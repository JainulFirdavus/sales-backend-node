var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
Schema = mongoose.Schema;

var schema = mongoose.Schema({
    invoiceId: { type: String, unique: true },
    userId: { type: Schema.ObjectId, ref: 'customers' },
    invoiceDate: { type: Number },
    created: { type: Number },
    customerName: { type: String },
    customerPhone: { type: String },
    invoiceDate: { type: Number },
    invoiceAt: { type: Date },
    customerAddress: { type: String },
    vatOne: { type: Number },
    vatTwo: { type: Number },
    amountOne: { type: Number },
    amountTwo: { type: Number },
    totalOne: { type: Number },
    totalTwo: { type: Number },
    grandTotal: { type: Number },
    status: { type: Number ,default:1},
    due: { type: Number },
    paymentType: { type: String },
    paidStatus:{ type: String },
    lastDue: Number,
    modified: { type: Boolean },
    modifiedDetails: [],
    paidStatusDetails:[]



}, { timestamps: true, versionKey: false });

/* schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
 */

var invoice = mongoose.model('invoice', schema, 'invoice');
module.exports = invoice;
