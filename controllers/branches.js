"use strict";
var db = require("../mongo/connector.js")
var bcrypt = require('bcrypt-nodejs');
//var mailcontent = require('../../model/mailcontent.js');
var async = require('async');
var moment = require('moment');
// var timezone = require('moment-timezone');
var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config.js'); //configuration variables

module.exports = function () {

    var router = {};

    router.save = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        } 
        if (!req.body._id || req.body._id === '') {
            delete req.body._id;
            req.body.status = 1;
            db.InsertDocument('branches', req.body, function (err, getinvoice) {
               
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    returndata.response = getinvoice;
                    returndata.status = 1;
                    res.send(returndata);
                }
            })
        } else {
            db.UpdateDocument('branches', { _id: req.body._id }, { $set: req.body }, {}, function (err, docdata) {
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    returndata.response = docdata;
                    returndata.status = 1;
                    res.send(returndata);
                }
            });
        }
    };

    router.list = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var brancheQuery = [
                { "$match": { status: { $ne: 0 } } },
                /* {
                    "$project": {
                        createdAt: 1,
                        updatedAt:
                        {
                            $cond: { if: { $eq: ["$updatedAt", "$createdAt"] }, then: "Admin Not Yet Logged In", else: '$updatedAt' }
                        },
                        username: 1,
                        status: 1,
                        role: 1,
                        email: 1,
                        activity: 1
                    }
                }, */
                { "$project": { username: 1, document: "$$ROOT" } }, {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
                }
            ];

            brancheQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

            if (req.body.search) {
                var searchs = req.body.search;
                brancheQuery.push({
                    "$match": {
                        $or: [
                            { "documentData.name": { $regex: searchs + '.*', $options: 'si' } },
                            { "documentData.email": { $regex: searchs + '.*', $options: 'si' } }
                        ]
                    }

                });
                //search limit
                brancheQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
                brancheQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.limit && req.body.skip >= 0) {
                    brancheQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                brancheQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
                //search limit
            }

            var sorting = {};
            if (req.body.sort) {
                var sorter = 'documentData.' + req.body.sort.field;
                sorting[sorter] = req.body.sort.invoice;
                brancheQuery.push({ $sort: sorting });
            } else {
                sorting["documentData.createdAt"] = -1;
                brancheQuery.push({ $sort: sorting });
            }

            if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                brancheQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            if (!req.body.search) {
                brancheQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
            }

            db.GetAggregation('branches', brancheQuery, function (err, docdata) {
                if (err || docdata.length <= 0) {
                    returndata.response = err ? err : 'No data found.';
                    res.send(returndata);
                } else {
                    returndata.status = 1;
                    returndata.response = { data: docdata[0].documentData, count: docdata[0].count };
                    res.send(returndata);
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };

    router.edit = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try { 
            db.GetOneDocument('branches', { _id: req.body._id, 'status': 1 }, {}, {}, function (err, customer) {
                if (err || !customer) {
                    returndata.response = 'customer not found';
                    res.send(returndata);
                } else {
                    returndata.response = customer;
                    returndata.status = 1;
                    res.send(returndata);
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };


    router.delete = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {

            db.UpdateDocument('branches', { _id: req.body._id, }, { 'status': 0 }, {}, function (err, customer) {
                if (err || !customer) {
                    returndata.response = 'customer not found';
                    res.send(returndata);
                } else {
                    returndata.response = customer;
                    returndata.status = 1;
                    res.send(returndata);
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };
    return router;
};