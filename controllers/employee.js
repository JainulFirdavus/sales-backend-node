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
    /*    
    url : localhost:5000/employee/register
    method:POST
    Fields: (Inside Body -  x-www-form-urlencoded) 
    header: {},
    
    email:jain@yopmail.com
    firstname:
    lastname:
    password:123456
    confirmPassword:123456
    phone:9597070570
    address:
    branch:
    role:
    position:
    grade:
    qualification:
    professional:
    blood_group:
    health_issues:
    basic_pay:
    hra_amount:
    pf_amount:
    da_amount:
    joining_date:
    relieving_date:
    relieving_reason: */
    router.register = function (req, res) {
        var returndata = {
            status: 0,
            response: 'Invalid response'
        }

        req.body.role = req.body.role != true ? 'employee' : 'admin';

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
        }
        req.body.status = 1;
        db.GetDocument('employee', { 'email': req.body.email }, {}, {}, function (err, getdata) {
            if (getdata && getdata.length != 0) {
                returndata.response = 'Phone is Already Exist';
                res.send(returndata);
            } else {
                //  data.activity.created = new Date();
                /*  if (getdata && getdata.phone) {
                     db.UpdateDocument('employee', { _id: req.body._id }, req.body, {}, function (err, docdata) {
                         if (err) {
                             returndata.response = err;
                             res.send(returndata);
                         } else {
                             returndata.status = 1;
                             returndata.response = docdata;
                             res.send(returndata);
                         }
                     });
                 } else { */
                // data.status = 1;
                db.InsertDocument('employee', req.body, function (err, result) {
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
            // }
        });
    };




    router.update = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        if (req.body._id) { 
            db.UpdateDocument('employee', { _id: req.body._id }, { $set: req.body }, {}, function (err, docdata) {
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    returndata.status = 1;
                    returndata.response = docdata;
                    res.send(returndata);
                }
            });
        }
    }
    router.login = function (req, res) {
        console.log("SS");
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var email = req.body.email;
            // var phone = req.body.phone;
            var password = req.body.password; 
            db.GetOneDocument('employee', { $or: [{ email: { $eq: email } }, { phone: { $eq: email } }], 'status': 1 }, {}, {}, function (err, customer) {
                console.log("------",err,customer);
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    console.log('----',customer);
                    if (!customer || !customer.validPassword(password)) {
                        returndata.response = 'You are not authorized to sign in. Verify that you are using valid credentials';
                        res.send(returndata);
                    } else {
                        var data = {};
                        data.last_login = Date.now();
                        data.last_login = Date.now();
                        db.UpdateDocument('employee', { _id: customer._id }, { $set: data }, {}, function (err, docdata) {
                            if (err) {
                                returndata.response = err;
                                res.send(err);
                            } else {

                                var authHeader = jwt.sign({ _id: customer._id, name: customer.name }, CONFIG.SECRET_KEY, { expiresIn: 86400 });
                                var data = {};
                                data.accessToken=authHeader;
                                data.user =customer
                                // data.email = customer.email;
                                // data.token = authHeader;
                                // data.username = customer.username;
                                // data.role = customer.role;
                                // data.user_id = customer._id;
                                // res.cookie('phone', data.email);
                                returndata.response = data;
                                returndata.status = 1;
                                res.send(returndata);
                            }
                        });
                    }
                }
            });
        } catch (error) {
            console.log(error);
            returndata.response = error;
            res.send(returndata);
        }
    };


    router.logout = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var data = {};
            data.last_logout = Date();
            db.UpdateDocument('employee', { _id: req.customer }, { $set: data }, {}, function (err, docdata) {
                if (err) {
                    returndata.response = err;
                    res.send(err);
                } else {
                    returndata.status = 1;
                    res.send(returndata);
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };

    router.getDeatils = function (req, res) {
        let returndata = {
            status: 0,
            // response: 'Invalid response'
        }
        try { 
            const verified = jwt.verify( req.body.token, CONFIG.SECRET_KEY);
            db.GetOneDocument('employee', { _id:verified._id, 'status': 1 }, {}, {}, function (err, customer) {
                if (err || !customer) {
                    returndata.response = 'customer not found';
                    res.send(returndata);
                } else {
                    returndata.user = customer;
                    returndata.status = 1;
                    res.send(returndata);
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };



    router.employeelist = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var employeeQuery = [
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

            employeeQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

            if (req.body.search) {
                var searchs = req.body.search;
                employeeQuery.push({
                    "$match": {
                        $or: [
                            { "documentData.username": { $regex: searchs + '.*', $options: 'si' } },
                            { "documentData.email": { $regex: searchs + '.*', $options: 'si' } }
                        ]
                    }

                });
                //search limit
                employeeQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
                employeeQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.limit && req.body.skip >= 0) {
                    employeeQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                employeeQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
                //search limit
            }

            var sorting = {};
            if (req.body.sort) {
                var sorter = 'documentData.' + req.body.sort.field;
                sorting[sorter] = req.body.sort.invoice;
                employeeQuery.push({ $sort: sorting });
            } else {
                sorting["documentData.createdAt"] = -1;
                employeeQuery.push({ $sort: sorting });
            }

            if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                employeeQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            if (!req.body.search) {
                employeeQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
            }

            db.GetAggregation('employee', employeeQuery, function (err, docdata) {
                if (err || docdata.length <= 0) {
                    data.response = err ? err : 'No data found.';
                    res.send(data);
                } else {
                    data.status = 1;
                    data.response = { data: docdata[0].documentData, count: docdata[0].count };
                    res.send(data);
                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };
    return router;
};