"use strict";
var db = require("../mongo/connector.js")
var mongo = require('mongodb'), ObjectID = mongo.ObjectID;
var bcrypt = require('bcrypt-nodejs');
//var mailcontent = require('../../model/mailcontent.js');
var async = require('async');
var moment = require('moment');
// var timezone = require('moment-timezone');
var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config.js'); //configuration variables

module.exports = function () {

    var router = {};


    router.getsettings = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        db.GetOneDocument('settings', { alias: 'general' }, {}, {}, function (err, settings) {
            if (err) {
                returndata.response = err;
                res.send(returndata);
            } else {
                returndata.response = settings;
                returndata.status = 1;
                res.send(returndata);
            }
        })
    }


    router.getsettingsDetails = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        async.parallel({
            settings: function (callback) {
                db.GetOneDocument('settings', { alias: 'general' }, {}, {}, function (err, settings) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(err, settings);

                    }
                })
            },
            employee: function (callback) {
                db.GetDocument('employee', {}, {}, {}, function (err, employee) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(err, employee);
                    }
                })
            },
        }, function (err, results) {
            returndata.status = 1;
            returndata.response = results;
            res.send(returndata);
        });
    }

    router.savesettings = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        } 

        if (!req.body._id) {
            req.body.alias = 'general'
            req.body._id = ObjectID();

            db.InsertDocument('settings', req.body, function (err, getinvoice) { 
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
            db.UpdateDocument('settings', { alias: 'general' }, { $set: req.body }, {}, function (err, docdata) {
                
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
    }



    router.dashoardDetails = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            console.log("ss");
            async.parallel({
                today: function (callback) {
                    /*   var today = new Date();
                     
                      var numberOfDays = 0;
                      var from = today.getTime()
                      var to = today.setDate(today.getDate() - numberOfDays)  //+ (-330 * 60000)
                     */
                    var from = new Date(new Date().setHours(0, 0, 0, 0)).getTime() ;
                    var to = new Date(new Date().setHours(23, 59, 59, 0)).getTime() //+ (-330 * 60000);
                 console.log( new Date(from), new Date(to));
                 console.log( from ,to );
                   
                    db.GetAggregation('invoice',
                        [
                            {
                                $match:
                                {
                                    status: 1,
                                    createdAt: {
                                        "$gte": new Date(from), "$lte": new Date(to)
                                    
                                                                                // "$lte": from, "$gte": to
                                    }
                                }
                            },
                            {
                                $group: {
                                    "_id": null,
                                    totalAmount: { $sum: "$total_amount" },
                                    advance: { $sum: "$advance" },
                                    balance: { $sum: "$balance" },
                                    count: { $sum: 1 }
                                }
                            }

                        ], function (err, invoiceDeatils) { 
                            console.log('invoiceDeatils',err,invoiceDeatils);
                            if (err) {
                                returndata.response = err;
                                res.send(returndata);
                            } else {
                                callback(null, invoiceDeatils);
                            }
                        })
                },

                total: function (callback) {
                    db.GetAggregation('invoice',
                        [
                            {
                                $match:
                                {
                                    status: 1,
                                    /*   created: {
                                          "$lte": from,
                                        //   "$gte": to
                                      } */
                                }
                            },
                            {
                                $group: {
                                    "_id": null,
                                    totalAmount: { $sum: "$total_amount" },
                                    count: { $sum: 1 }
                                }
                            }

                        ], function (err, invoiceDeatils) {
                           
                            if (err) {
                                returndata.response = err;
                                res.send(returndata);
                            } else {
                                callback(null, invoiceDeatils);
                            }
                        })
                }
            }, function (err, results) {

                returndata.status = 1;
                returndata.response = results;
                console.log(returndata);
                res.send(returndata);
            });

        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };



    router.getChartInvoice = function (req, res) {
        let year ="2022"
        let from = new Date(`01/01/${year}`);
        let to = new Date(`01/01/${Number(year)+1}`);
 
        db.GetAggregation('invoice',
        [
            {
                $match:
                {
                    // status: 1,
                    createdAt: {
                          "$gte": from, "$lte": to
                      }
                }
            },
           
            {
                $project: {
                   createdAt:1,
                   invoiceAt:1,
                   grandTotal:1,
                   year: {$year: {date: "$invoiceAt"}},
                   month: {$month: {date: "$invoiceAt"}},
                   newFieldName: {'$dateToString': {format: '%Y-%m', date: '$invoiceAt', onNull: null}}
                }
             } ,
             {
                $group: {
                  _id: {
                    month: "$month",
                    year: "$year"
                   /*  $dateToString: {
                      "date": "$invoiceAt",
                      "format": "%m"
                    }, */
                  },
                  grandTotal:{"$sum":"$grandTotal"},

                  
                //  documentDate:{ $push: "$$ROOT" }
            }
        },
        {$group: {  _id: "$_id.year", documentDate:{ $push: {month:"$_id.month",amount:"$grandTotal"} } }}
            /* { $unwind: { path: "$documentDate", preserveNullAndEmptyArrays: true } },   
            {
                $group: {
                  _id: {
                    $dateToString: {
                      "date": "$documentDate.invoiceAt",
                      "format": "%Y"
                    },
                  },
                  month:{"$first":"$_id"},
                  values:{$push: "$documentDate" }
                }
            }   */ 

        ], function (err, invoiceDeatils) { 
            if (err) { 
                res.send([ ]);
            } else {
                res.send(invoiceDeatils); 
            }
        })
}
    


    return router;
};