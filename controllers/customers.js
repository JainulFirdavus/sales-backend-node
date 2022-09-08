"use strict";
var db = require("../mongo/connector.js")
var bcrypt = require('bcrypt-nodejs');
var middleware = require('../middleware/common');
var async = require('async');
var moment = require('moment');
// var timezone = require('moment-timezone');
var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config.js'); //configuration variables

module.exports = function () {

    var router = {};



    router.save = function (req, res) {
        var data = {
            activity: {}
        };
        var returndata = {
            status: 0,
            response: 'Invalid response'
        }
        data = req.body;
        data.status = 1;
        console.log("phone",req.body);
        if (req.body._id) {
            db.UpdateDocument('customers', { _id: req.body._id }, data, {}, function (err, docdata) {
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    returndata.status = 1;
                    returndata.response = docdata;
                    res.send(returndata);
                }
            });
        } else {
            db.GetDocument('customers', { 'phone': req.body.phone }, {}, {}, function (err, getdata) {
                if (getdata.length != 0) {
                    returndata.response = 'Phone Number is Already Exist';
                    res.send(returndata);
                } else {
                    //  data.activity.created = new Date();
                    data.status = 1;
                    db.InsertDocument('customers', data, function (err, result) {
                        if (err) {
                            returndata.response = err;
                            res.send(returndata);
                        } else {
                            returndata.status = 1;
                            returndata.response = result;
                            res.send(returndata);
                        }
                    });
                }
            });
        }
    };


  /*   router.login = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try { 
            var email = req.body.email;
            var password = req.body.password;

            var authHeader = jwt.sign(email, CONFIG.SECRET_KEY);
            db.GetOneDocument('customers', { $or: [{ email: { $eq: email } }, { username: { $eq: email } }], 'status': 1 }, {}, {}, function (err, customer) {
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    if (!customer || !customer.validPassword(password)) {
                        returndata.response = 'You are not authorized to sign in. Verify that you are using valid credentials';
                        res.send(returndata);
                    } else {
                        var data = { activity: {} };
                        data.activity.last_login = Date.now();
                        db.UpdateDocument('customers', { _id: customer._id }, data, {}, function (err, docdata) {
                            if (err) {
                                returndata.response = err;
                                res.send(err);
                            } else {
                                var data = {};
                                data.email = customer.email;
                                data.token = authHeader;
                                data.username = customer.username;
                                res.cookie('email', data.email);
                                returndata.response = data;
                                returndata.status = 1;
                                res.send(returndata);
                            }
                        });
                    }
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    }; */


    router.customerslist = function (req, res) {
        let data = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var customersQuery = [
                { "$match": { status: { $ne: 0 } } },
                { $lookup: { from: 'invoice', foreignField: 'userId', localField: '_id', as: 'customerDetails' } },
                { $addFields: { customerOrderCount: { $size: "$customerDetails" } } },

                {
                    "$project": {
                        createdAt: 1,
                        updatedAt:
                        {
                            $cond: { if: { $eq: ["$updatedAt", "$createdAt"] }, then: "Admin Not Yet Logged In", else: '$updatedAt' }
                        },
                        name: 1,
                        customerOrderCount: 1,
                        phone: 1,
                        address: 1

                    }
                },
                { "$project": { name: 1, document: "$$ROOT" } }, {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
                }
            ];

            customersQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

            if (req.body.search) {
                var searchs = req.body.search;
                customersQuery.push({
                    "$match": {
                        $or: [
                            { "documentData.name": { $regex: searchs + '.*', $options: 'si' } },
                            { "documentData.phone": { $regex: searchs + '.*', $options: 'si' } }
                        ]
                    }

                });
                //search limit
                customersQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
                customersQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.limit && req.body.skip >= 0) {
                    customersQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                customersQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
                //search limit
            }

            var sorting = {};
            if (req.body.sort) {
                var sorter = 'documentData.' + req.body.sort.field;
                sorting[sorter] = req.body.sort.invoice;
                customersQuery.push({ $sort: sorting });
            } else {
                sorting["documentData.createdAt"] = -1;
                customersQuery.push({ $sort: sorting });
            }

            if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                customersQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            if (!req.body.search) {
                customersQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
            }

            db.GetAggregation('customers', customersQuery, function (err, docdata) {
                if (err || docdata.length <= 0) {
                    data.response = {data:[],count:0};
                    res.send(data);
                } else {
                    data.status = 1;
                    data.response = { data: docdata[0].documentData, count: docdata[0].count };
                    res.send(data);
                }
            });
        } catch (error) {
            data.response = {data:[],count:0};
            res.send(returndata);
        }
    };
    router.customerDetails = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        let query = {} 
        if (req.body._id) {
            query['_id'] = req.body._id
        }
        if (req.body.phone) {
            query['phone'] = req.body.phone
        }
        console.log(query);

        db.GetOneDocument('customers',query, {}, {}, function (err, customer) {
            if (err) {
                returndata.response = err;
                res.send(returndata);
            } else {
                returndata.status = customer ? 1 : 0;
                returndata.response = customer;
                res.send(returndata);
            }

        })
    }


  /*   router.customerVisit = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        let from = new Date(req.body.date).setHours(0, 0, 0, 0);
        let to = from.valueOf() + 1000 * 3600 * 24;

        db.GetAggregation('invoice',
            [
                { $match: { next_visit: { $gte: from, $lte: to } } },
                { $lookup: { from: 'customers', foreignField: '_id', localField: 'userId', as: 'customer' } },

                {
                    "$project": {
                        _id: 1,
                        invoiceId: 1,
                        delivery_date: 1,
                        invoiceDate: 1,
                        total_amount: 1,
                        invoice_taken: 1,
                        customerPhone: 1,
                        next_visit: 1,
                        delivery_status: 1,
                        paid_status: 1,
                        customerName: 1,
                        employee_id: 1,
                        userId: 1, created: 1,
                        customer: '$customer',
                    }
                },
                {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$$ROOT" } }
                }

            ], function (err, invoiceDeatils) { 
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    returndata.status = 1;
                    returndata.response = invoiceDeatils;
                    res.send(returndata);
                }
            })


    } */


 /*    router.sendmessage = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        db.GetOneDocument('invoice', { _id: req.body._id }, {}, {}, function (err, invoiceDeatils) {
            if (err) {
                returndata.response = err;
                res.send(returndata);
            } else {
                let to = invoiceDeatils.customerPhone;
                var today = new Date();
                let date = today.toLocaleDateString("en-US");
                middleware.bulksms(to, date)
                returndata.status = 1;
                returndata.response = invoiceDeatils;
                res.send(returndata);
            }
        })
    } */

    return router;
};