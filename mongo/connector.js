var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

/*---new db schema----*/
/* var config_settings_schema = require('./schema/setting.schema');

// define the schema for our customer model
var settingsSchema = mongoose.Schema(config_settings_schema.settings, { timestamps: true, versionKey: false });
var currencySchema = mongoose.Schema(config_settings_schema.currency, { timestamps: true, versionKey: false });
var languagesSchema = mongoose.Schema(config_settings_schema.languages, { timestamps: true, versionKey: false }); */

/*---new db schema----*/
var config_settings_schema = require('./schema/setting.schema');
var settingsSchema = mongoose.Schema(config_settings_schema.settings, { timestamps: true, versionKey: false });

var customers = require('./schema/customerSchema');
var employee = require('./schema/employeeSchema');
var purchase = require('./schema/purchaseSchema');
var dealers = require('./schema/dealersSchema');
var invoice = require('../mongo/schema/invoiceSchema');
var settings = mongoose.model('settings', settingsSchema, 'settings');


var db = {
    'employee':employee, 'customers': customers, 'invoice': invoice,  'settings': settings, 'dealers': dealers,'purchase':purchase

};

function GetDocument(model, query, projection, extension, callback) {
    var query = db[model].find(query, projection, extension.options);
    if (extension.populate) {
        query.populate(extension.populate);
    }
    if (extension.sort) {
        query.sort(extension.sort);
    }
    query.exec(function (err, docs) {
        if (extension.count) {
            query.count(function (err, docs) {
                callback(err, docs);
            });
        } else {
            callback(err, docs);
        }
    });
}

function GetOneDocument(model, query, projection, extension, callback) {
    var query = db[model].findOne(query, projection, extension.options);
    if (extension.populate) {
        query.populate(extension.populate);
    }
    if (extension.sort) {
        query.sort(extension.sort);
    }
    query.exec(function (err, docs) {
        callback(err, docs);
    });
}

function GetAggregation(model, query, callback) {
    db[model].aggregate(query).exec(function (err, docs) {
        callback(err, docs);
    });
}

function InsertDocument(model, docs, callback) {
    var doc_obj = new db[model](docs);
    doc_obj.save(function (err, numAffected) {
        callback(err, numAffected);
    })
}

function DeleteDocument(model, criteria, callback) {
    db[model].remove(criteria, function (err, docs) {
        callback(err, docs);
    });
}

function UpdateDocument(model, criteria, doc, options, callback) {
    db[model].updateOne(criteria, doc, options, function (err, docs) {
        callback(err, docs);
    });
}

function findOneAndUpdate(model, criteria, doc, options, callback) {
    db[model].findOneAndUpdate(criteria, doc, options, function (err, docs) {
        callback(err, docs);
    });
}

/* function findOne(model, query, projection, extension, callback) {
   db[model].findOne(query, projection, extension , function(err , docs){
    callback(err, docs);
   });
} */


function GetCount(model, conditions, callback) {
    db[model].countDocuments(conditions, function (err, count) {
        callback(err, count);
    });
}


function PopulateDocument(model, docs, options, callback) {
    db[model].populate(docs, options, function (err, docs) {
        callback(err, docs);
    });
}

function RemoveDocument(model, criteria, callback) {
    db[model].remove(criteria, function (err, docs) {
        callback(err, docs);
    });
}
 

module.exports = {
    "GetDocument": GetDocument,  
    "GetOneDocument": GetOneDocument,
    "InsertDocument": InsertDocument,
    "DeleteDocument": DeleteDocument,
    "UpdateDocument": UpdateDocument,
    "GetAggregation": GetAggregation,
    "PopulateDocument": PopulateDocument,
    "RemoveDocument": RemoveDocument,
    "GetCount": GetCount,
    "findOneAndUpdate": findOneAndUpdate,
};
