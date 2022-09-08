var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
    dealersId: { type: Schema.ObjectId, ref: 'dealers' },
    dealer: {  },
    purchaseAt:Date,
    
    dateOfPurchase: { type: Number },
    purchaseId:String,
    DOP:String,
    amount:Number,
    vat:Number,
    grandTotal:Number,
    due: Number,
    billToBill:Boolean,
    billNo:{ type: String },
    dueDetails:[],
    balance:Number,
    paid_at:Number,
    paidStatus:String,
    paymentType:String,
    lastDue: Number,

    status: { type: Number, default: 1 },

}, { timestamps: true, versionKey: false });



var purchase = mongoose.model('purchase', schema, 'purchase');
module.exports = purchase;
