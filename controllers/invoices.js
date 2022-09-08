"use strict";
var db = require("../mongo/connector.js")
var bcrypt = require('bcrypt-nodejs');
const Excel = require("exceljs");
var middleware = require('../middleware/common');
var async = require('async');
var moment = require('moment');
var path = require('path');
// var timezone = require('moment-timezone');

var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config.js'); //configuration variables
var ObjectID = require('mongodb').ObjectID;
const { currency } = require("../mongo/schema/setting.schema.js");
const customersModule = require("../mongo/schema/customerSchema");


module.exports = function () {

    var router = {};

    router.lastinvoice = function (req, res) {
        var returndata = {
            status: 0,
            response: 'Invalid response'
        }
        db.GetOneDocument('invoice', {}, { _id: 1, invoiceId: 1 }, { sort: { _id: -1 } }, function (err, getinvoice) {
            if (err) {
                returndata.response = err;
                returndata.invoiceId = '0000';
                res.send(returndata);
            } else {
                returndata.status = 1;
                returndata.response = getinvoice
                res.send(returndata);
            }
        })
    }

    router.save = async function (req, res) {
        var data = {
            activity: {},
            modifiedDetails:[],
            paidStatusDetails:[]
        };
        var returndata = {
            status: 0,
            response: 'Invalid response'
        }
        data = JSON.parse(JSON.stringify(req.body));
        if (req.body.delivery_date) {
            data.delivery_date = new Date(req.body.delivery_date).getTime();
        }
        if (req.body.invoiceDate) {
            data.invoiceDate = new Date(req.body.invoiceDate).getTime();
            data.invoiceAt = new Date(req.body.invoiceDate)

        }

        if (req.body.paid_status == 'paid') {
            data.paid_at = Date.now()
        }
        if (req.body.paidStatus) {
            data.paidStatus = req.body.paidStatus
        }

        if (req.body.invoiceDate) {
            data.lastDue = new Date(req.body.invoiceDate).getTime() + ((Number(data.due) * 30) * 24 * 60 * 60 * 1000);
         
        }
        /* return */
       
        if (req.body.userId) {
            const customerDetails = await customersModule.findById({ _id: req.body.userId })
            if(customerDetails)
            data.userId = customerDetails._id

        }else{
            data.userId = ObjectID(); 
        }

        if (req.body._id) {
            db.GetOneDocument('invoice', { _id: req.body._id }, {}, {}, function (err, getinvoice) {
                if (getinvoice.grandTotal !== data.grandTotal) {
                    data.modifiedDetails =  getinvoice.modifiedDetails;
                    data.modifiedDetails.push({
                        "updateAt": new Date(),
                        "dateString": Date.now(),
                        "grandTotal": getinvoice.grandTotal,
                        "vatOne": getinvoice.vatOne,
                        "vatTwo": getinvoice.vatTwo,
                        "amountOne": getinvoice.amountOne,
                        "amountTwo": getinvoice.amountTwo,
                        "totalOne": getinvoice.totalOne,
                        "totalTwo": getinvoice.totalTwo,
                        "paidStatus": getinvoice.paidStatus,
                    })
                }
                if (getinvoice.paidStatus !== data.paidStatus) {
                    data.paidStatusDetails = getinvoice.paidStatusDetails;
                    getinvoice.paidStatusDetails.push({ perviousStatus: getinvoice.paidStatus, currentStatus: data.paidStatus, "updateAt": new Date(), "dateString": Date.now() })
                }
                db.UpdateDocument('invoice', { _id: req.body._id }, { $set: data }, {}, function (err, docdata) {
                    
                    if (err) {
                        returndata.response = err;
                        res.send(returndata);
                    } else {
                        returndata.status = 1;
                        returndata.response = docdata;
                        res.send(returndata);
                    }
                });

            })

        } else { 
            data.created = Date.now();
            db.InsertDocument('invoice', data, function (err, result) {
                if (result && result._id) { 
                    if (!req.body.userId) {
                        db.InsertDocument('customers', {
                            name: req.body.customerName, phone: req.body.customerPhone, address: req.body.customerAddress,
                        }, function (err, userDeatils) { 
                            if (err) {
                                returndata.response = err;
                                res.send(returndata);
                            } else {
                                db.UpdateDocument('invoice', { _id: result._id }, { $set: { userId: userDeatils._id } }, {}, function (err, docdata) {
                                    returndata.response = result;
                                    returndata.status = 1;
                                    res.send(returndata);
                                })
                            }
                        })
                    } else {
                        returndata.response = result;
                        returndata.status = 1;
                        res.send(returndata);
                    }
                } else {
                    returndata.response = err; 
                    res.send(returndata);
                }

            });
        }

        /* 
                async.waterfall([
                    function (callback) {
                        if (!req.body.userId && req.body.customerName) {
                            db.InsertDocument('customers', {
                                name: req.body.customerName, phone: req.body.customerPhone, address: req.body.customerAddress, age: req.body.customer_age, gender: req.body.customer_gender,
                                visitng: [{
                                    last_visit: req.body.last_visit, next_visit: req.body.next_visit, branch: req.body.branch,
                                    empolyee_id: req.body.empolyee_id, createdAt: new Date()
                                }]
                            }, function (err, userDeatils) {
                                if (err) {
                                    returndata.response = err;
                                    res.send(returndata);
                                } else {
                                    callback(null, userDeatils._id);
                                }
                            });
                        }
                    },
                    function (customer, callback) {              
                        data.userId = customer;
                        if (req.body._id) {
                            db.UpdateDocument('invoice', { _id: req.body._id }, data, {}, function (err, docdata) {
                                if (err) {
                                    returndata.response = err;
                                    res.send(returndata);
                                } else {
                                    db.GetDocument('invoice', { _id: req.body._id }, {}, {}, function (err, getinvoice) {
                                        callback(null, getinvoice);
                                    })
                                }
                            });
                        } else {
                            //  data.activity.created = new Date();
                            data.status = 1;
                            db.InsertDocument('invoice', data, function (err, result) {
                                 if (err) {
                                    returndata.response = err;
                                    res.send(returndata);
                                } else {
                                    callback(null, result);
                                }
                            });
                        }
        
        
                    }
                ], function (err, result) {
                    // result now equals to 'Task1 and Task2 completed'
        
                    db.UpdateDocument('customers', { _id: req.body._id }, {
                        visitng: {
                            $push: {
                                last_visit: req.body.last_visit, next_visit: req.body.next_visit, branch: req.body.branch,
                                invoice: req.body.employee, createdAt: new Date()
                            }
                        }
                    }, {}, function (err, docdata) {
                        if (err) {
                            returndata.response = err;
                            res.send(returndata);
                        } else {
                            db.GetDocument('customers', { _id: req.body._id }, {}, {}, function (err, getinvoice) {
                                callback(null, req.body.userId);
                            })
                        }
                    })  
                });
        */
    };



    router.getinvoices = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        var data = { status: { $ne: 0 } }
        if (req.body.delivery_status) { data.delivery_status = req.body.delivery_status }
        if (req.body.customer) {
            data['$or'] =
                [
                    { 'invoiceId': req.body.customer },
                    { 'customerPhone': req.body.customer }
                ]
        }
        if (req.body.from && req.body.to) {
            let from = new Date(new Date(req.body.from).setUTCHours(0, 0, 0, 0)).getTime() + (-330 * 60000);
            let to = new Date(new Date(req.body.to).setUTCHours(23, 59, 59, 0)).getTime();
            data['invoiceDate'] = { $gte: from, $lte: to };
        }
        if (req.body.filterStatus) {
            data['paidStatus'] = req.body.filterStatus
        }
        async.parallel({
            totalCount: function (callback) {
                let query = [
                    {
                        $project: {
                            grandTotal: 1,

                        },
                    },
                    { $group: { _id: null, count: { $sum: 1 }, grandTotal: { $sum: '$grandTotal' } } }
                ]
                db.GetAggregation('invoice', query, function (err, docData) {
                    callback(null, docData)
                })
            },
            getDocument: function (callback) {
                var invoiceQuery = [
                    { "$match": data },
                    {
                        $lookup:
                        {
                            from: "customers",
                            localField: "userId",
                            foreignField: "_id",
                            as: "customers"
                        }
                    }, {
                        $unwind:
                        {
                            path: "$customers",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    { "$project": { username: 1, document: "$$ROOT" } }, {
                        $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
                    }
                ];

                invoiceQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.search) {
                    var searchs = req.body.search;
                    invoiceQuery.push({
                        "$match": {
                            $or: [
                                { "documentData.invoiceId": { $regex: searchs + '.*', $options: 'si' } },
                                { "documentData.customerName": { $regex: searchs + '.*', $options: 'si' } },
                                { "documentData.customerPhone": { $regex: searchs + '.*', $options: 'si' } },
                                { "documentData.paidStatus": { $regex: searchs + '.*', $options: 'si' } }
                            ]
                        }

                    });
                    //search limit
                    invoiceQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
                    invoiceQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                    if (req.body.limit && req.body.skip >= 0) {
                        invoiceQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                    }
                    invoiceQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, totalRecord: { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
                    //search limit
                }

                var sorting = {};
                if (req.body.sort) {
                    var sorter = 'documentData.' + req.body.sort.field;
                    sorting[sorter] = req.body.sort.invoice;
                    invoiceQuery.push({ $sort: sorting });
                } else {
                    sorting["documentData.createdAt"] = -1;
                    invoiceQuery.push({ $sort: sorting });
                }

                if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                    invoiceQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                if (!req.body.search) {
                    invoiceQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, totalRecord: { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
                }
                db.GetAggregation('invoice', invoiceQuery, function (err, docdata) {
                    if (err || docdata.length <= 0) {
                        callback(null, docdata)
                    } else {
                        callback(null, docdata)
                    }
                });
            }


        }).then(results => { 
            // results is equal to: { one: 1, two: 2 }
            let invoiceCalQuery = [
                // { "$match": data },
                { $addFields: { totalCount: { $literal: results.totalCount[0] ? results.totalCount[0].count : 0 } } },
                // { $addFields: { totalCount: { $sum: 1 } } },
                {
                    $bucket: {
                        groupBy: "$paidStatus",                                  // Field to group by
                        boundaries: ['Cancelled', 'Over Due', 'Paid', 'UnPaid'], // Boundaries for the buckets
                        default: "UnPaid",                                     // Bucket id for documents which do not fall into a bucket
                        output: {                                                // Output for each bucket
                            "total": { $sum: 1 },
                            "price": { $sum: '$grandTotal' },
                            "totalCount": { $first: '$totalCount' },
                            //  "percent": { $multiply: [{ $divide: ["$totalCount", "$total"] }, 100] },
                            /*  "artists":
                             {
                                 $push: {
                                     "name": "$invoiceId",
                                     "paidStatus": "$paidStatus"
                                 }
                             } */
                        }
                    }
                },
                { $project: { fullRevanue: 1, total: 1, price: 1, "percentage": { $round: [{ "$multiply": [{ "$divide": [100, "$totalCount"] }, "$total"] }, 1] } } }
            ]
            db.GetAggregation('invoice', invoiceCalQuery, function (err, totalDocData) {
                if (err || totalDocData.length <= 0) {
                    returndata.response = { data: [], count: 0 };
                    res.send(returndata)
                } else {
                    totalDocData.push({
                        "_id": "all",
                        "total": results.totalCount[0].count,
                        "price": results.totalCount[0].grandTotal,
                        "percentage": 100
                    })
                    returndata.status = 1;
                    returndata.response = { data: results.getDocument[0] ? results.getDocument[0].documentData : [], count: results.totalCount, totalDocData: totalDocData };
                    res.send(returndata)
                }
            })
        }).catch(err => {
            console.log(err);
        });
    };

    router.userinvoiceList = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        db.GetAggregation('invoice',
            [
                { $match: { customerPhone: req.body.phone } },
                { "$project": { username: 1, document: "$$ROOT" } },
                {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
                }
            ], function (err, invoiceDeatils) { 
                if (err || !invoiceDeatils[0]) {
                    returndata.response = !invoiceDeatils[0] ? [] : err;
                    res.send(returndata);
                } else {
                    returndata.status = invoiceDeatils[0] && invoiceDeatils[0].documentData.length > 0 ? 1 : 0;
                    returndata.response = invoiceDeatils[0].documentData;
                    res.send(returndata);
                }
            })
    }

    router.getinvoicesId = function (req, res) {
        var returndata = {
            status: 0,
            response: 'Invalid response'
        }
       
        db.GetOneDocument('invoice', { _id: req.body._id }, {}, {}, function (err, getinvoice) {
           
            if (err) {
                returndata.response = err;
                returndata.invoiceId = '0000';
                res.send(returndata);
            } else {
                returndata.status = 1;
                returndata.response = getinvoice
                res.send(returndata);
            }
        })
    }

    router.invoiceExport = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var data = { status: { $ne: 0 } }
            if (req.body.delivery_status) { data.delivery_status = req.body.delivery_status }
            if (req.body.customer) {
                data['$or'] =
                    [
                        { 'invoiceId': req.body.customer },
                        { 'customerPhone': req.body.customer }
                    ]
            }
            if (req.body.date) {
                let from = new Date(req.body.date).setHours(0, 0, 0, 0);
                let to = from.valueOf() + 1000 * 3600 * 24;
                 
                data['created'] = { $gte: from, $lte: to };
            }
           
            var invoiceQuery = [
                { "$match": data },
                /* {
                    $lookup:
                    {
                        from: "customers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "customers"
                    }
                }, {
                    $unwind:
                    {
                        path: "$customers",
                        preserveNullAndEmptyArrays: true
                    }
                }, */

                {
                    "$project": {
                        _id: 1,
                        status: 1,
                        invoiceId: 1,
                        userId: 1,
                        invoiceDate: 1,
                        created: 1,
                        delivery_date: 1,
                        customerPhone: 1,
                        customerName: 1,
                        customerAddress: 1,
                        customer_age: 1,
                        customer_gender: 1,
                        lens_type: 1,
                        lens_price: 1,
                        tint: 1,
                        tint_discount: 1,
                        lens_tax: 1,
                        frame_type: 1,
                        frame_price: 1,
                        frame_brand: 1,
                        frame_tax: 1,
                        frame_discount: 1,
                        total_amount: 1,
                        discount: 1,
                        advance: 1,
                        balance: 1,
                        grand_total: 1,
                        next_visit: 1,
                        refered_by: 1,
                        empolyee_id: 1,
                        delivery_status: 1,

                    }
                }, {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$$ROOT" } }
                }
            ];

            invoiceQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

            if (req.body.search) {
                var searchs = req.body.search;
                invoiceQuery.push({
                    "$match": {
                        $or: [
                            { "documentData.invoiceId": { $regex: searchs + '.*', $options: 'si' } },
                            { "documentData.customers": { $regex: searchs + '.*', $options: 'si' } }
                        ]
                    }

                });
                //search limit
                invoiceQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
                invoiceQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.limit && req.body.skip >= 0) {
                    invoiceQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                invoiceQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
                //search limit
            }

            var sorting = {};
            if (req.body.sort) {
                var sorter = 'documentData.' + req.body.sort.field;
                sorting[sorter] = req.body.sort.invoice;
                invoiceQuery.push({ $sort: sorting });
            } else {
                sorting["documentData.createdAt"] = -1;
                invoiceQuery.push({ $sort: sorting });
            }

            if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                invoiceQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            if (!req.body.search) {
                invoiceQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
            }

            db.GetAggregation('invoice', invoiceQuery, function (err, docdata) {
             
                if (err || !docdata[0]) {
                    returndata.response = err ? err : 'No data found.';
                    res.send(returndata);
                } else {
                   
                    var workbook = new Excel.Workbook();
                    var worksheet = workbook.addWorksheet('My Sheet');
                    let sheetColumns = []
                    for (const property in docdata[0].documentData[0]) {
                         sheetColumns.push({ header: property, key: property })
                    }
                    worksheet.columns = sheetColumns;
                   
                    for (let i = 0; i < docdata[0].documentData.length; i++) {

                         worksheet.addRow(docdata[0].documentData[i]);
                    }


                    // worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
                    // worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

                    // var tempFilePath = tempfile('.xlsx');

                    var filename = 'Export-' + Date.now() + '.xlsx';
                    var tempFilePath = './uploads/invoices/' + filename;
                    workbook.xlsx.writeFile(tempFilePath).then(function () { 
                        middleware.sendmail(tempFilePath, filename), (function (err, result) {

                        })
                        returndata.status = 1;
                        returndata.response = 'Send to Mail';
                        res.send(returndata);
                        /* res.sendFile(path.resolve(tempFilePath), function (err) {
                            if (err) {
                                next(err);
                            } else {
                                returndata.status = 1;
                                returndata.response = 'Send to Mail';
                                res.send(returndata);
                            }
                        });*/
                    });


                    /*  var xlsx = json2xlsx(docdata[0].documentData);
                     var filepath = `./uploads/invoices/+${new Date().toLocaleTimeString()}.xlsx`;
                     fs.writeFileSync(filepath, xlsx, 'binary');
                     res.send(filepath) */
                    // middleware.groupChildren(docdata.documentData)

                }
            });
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };

    router.invoiceReport = function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }

        var data = {}
        var current = new Date().setUTCHours(23, 59, 59, 0);
        var today = new Date(current).getTime();
        var from, to;

        if (req.body.reportfor) {
            if (req.body.reportfor == 'Monthly Report') {
                from = (today - ((1000 * 3600 * 24) * 30));
                to = today;
            } else {
                from = (today - ((1000 * 3600 * 24) * 7));
                to = today;
            }
        }

        if (req.body.from && req.body.to) {
            // from = new Date(Date.now() + (new Date(req.body.from).getTimezoneOffset() * 60000)).getTime()
            // to = new Date(Date.now() + (new Date(req.body.to).getTimezoneOffset() * 60000)).getTime()
            from = new Date(new Date(req.body.from).setUTCHours(0, 0, 0, 0)).getTime() + (-330 * 60000);
            to = new Date(new Date(req.body.to).setUTCHours(23, 59, 59, 0)).getTime();
        }

        if (from && to) {
            data['created'] = { $gte: from, $lte: to };
        }
 
        var invoiceQuery = [
            { "$match": data },
            {
                $lookup:
                {
                    from: "employee",
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee_id"
                }
            }, {
                $unwind:
                {
                    path: "$employee_id",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $lookup: { from: 'employee', foreignField: '_id', localField: 'empolyee_id', as: 'empolyee' } },
            { $unwind: { path: "$empolyee", preserveNullAndEmptyArrays: true } },
            {
                $group: { "_id": null, "count": { "$sum": 1 }, "total_amount": { "$sum": "$total_amount" }, "discount": { "$sum": "$discount" }, "grand_total": { "$sum": "$grand_total" }, "documentData": { $push: "$$ROOT" } }
            }
        ];

        invoiceQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

        if (req.body.search) {
            var searchs = req.body.search;
            invoiceQuery.push({
                "$match": {
                    $or: [
                        { "documentData.invoiceId": { $regex: searchs + '.*', $options: 'si' } },
                        { "documentData.customers": { $regex: searchs + '.*', $options: 'si' } }
                    ]
                }

            });
            //search limit
            invoiceQuery.push({ $group: { "_id": null, "total_amount": { "$first": "$total_amount" }, "discount": { "$first": "$discount" }, "grand_total": { "$first": "$grand_total" }, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
            invoiceQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
            if (req.body.limit && req.body.skip >= 0) {
                invoiceQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            invoiceQuery.push({ $group: { "_id": null, "total_amount": { "$first": "$total_amount" }, "discount": { "$first": "$discount" }, "grand_total": { "$first": "$grand_total" }, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
            //search limit
        }

        var sorting = {};
        if (req.body.sort) {
            var sorter = 'documentData.' + req.body.sort.field;
            sorting[sorter] = req.body.sort.invoice;
            invoiceQuery.push({ $sort: sorting });
        } else {
            sorting["documentData.createdAt"] = -1;
            invoiceQuery.push({ $sort: sorting });
        }

        if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
            invoiceQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
        }
        if (!req.body.search) {
            invoiceQuery.push({ $group: { "_id": null, "total_amount": { "$first": "$total_amount" }, "discount": { "$first": "$discount" }, "grand_total": { "$first": "$grand_total" }, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
        }
        db.GetAggregation('invoice', invoiceQuery, function (err, docdata) {
             if (err || !docdata[0]) {
                res.send({ status: 0, response: [] })
            }
            else {
                res.send({ status: 1, response: docdata[0] })

            }
        });
    };

    router.smsSchedule = function () {
        var today = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
        let data = {};
        let from = new Date(today).setHours(0, 0, 0, 0) //+ (1000 * 3600 * 24)*56;
        let to = new Date(from).setHours(23, 59, 0);
        data['next_visit'] = { $gte: from, $lte: to };
        data['message_status'] = { $eq: 0 };
        data['reminder'] = true;

        var invoiceQuery = [
            { "$match": data },
            { "$project": { customerPhone: 1, invoiceId: 1, _id: 1, customerName: 1 } },
            { "$group": { _id: null, members: { $push: "$$ROOT" }, count: { "$sum": 1 } } }
        ]
        db.GetAggregation('invoice', invoiceQuery, function (err, docdata) {
            if (err) {

            } else {
                if (err || !docdata[0]) {
                    console.log("Cron Empty")
                } else {
                    let customerPhone = [];
                    let invoices = [];
                    if (docdata[0].members && docdata[0].members.length > 0) {
                        docdata[0].members.filter((item, index) => {
                            customerPhone.push(item.customerPhone)
                            invoices.push(item._id)

                        })
                        let to = customerPhone.filter(function (item, pos) {
                            return customerPhone.indexOf(item) == pos;
                        })

                        var today = new Date();
                        let date = today.toLocaleDateString("en-US")
                        middleware.bulksms(to, date)
                    }
                    db.UpdateDocument('invoice', { _id: { $in: invoices } }, { $set: { message_status: 1 } }, {}, function (err, date) {

                    })
                }



            }

        })
    }

    router.getoverDue = function (req, res) {
        var returndata = {
            status: 0,
            response: 'Invalid response'
        }
        var data = { status: { $ne: 0 }, paidStatus: { $ne: 'Paid' } }

        let from = new Date().setHours(0, 0, 0, 0);
        let to = from.valueOf() - (1000 * 3600 * 24); 
        data['lastDue'] = { $lte: from };

        var invoiceQuery = [
            { "$match": data },
            { "$project": { username: 1, document: "$$ROOT" } }, {
                $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
            }
        ];


        db.GetAggregation('invoice', invoiceQuery, function (err, docdata) {


            if (err || docdata.length <= 0) {
                returndata.response = err ? err : 'No data found.';
                res.send(returndata);
            } else {
                returndata.status = 1;
                returndata.response = { data: docdata[0].documentData, count: docdata[0].count };
                res.send(returndata);
            }
        });
    }
    return router;
};