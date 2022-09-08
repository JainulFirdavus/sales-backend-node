"use strict";
var db = require("../mongo/connector.js")
var mongo = require('mongodb'), ObjectID = mongo.ObjectID;
var bcrypt = require('bcrypt-nodejs');
//var mailcontent = require('../../model/mailcontent.js');
var async = require('async');
var moment = require('moment');

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
            console.log('-----',data);

            db.UpdateDocument('dealers', { _id: req.body._id }, data, {}, function (err, docdata) {
                console.log('====',err, docdata);
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
            db.GetDocument('dealers', { 'phone': req.body.phone }, {}, {}, function (err, getdata) {
                if (getdata.length != 0) {
                    returndata.response = 'Phone Number is Already Exist';
                    res.send(returndata);
                } else {
                    //  data.activity.created = new Date();
                    data.status = 1;
                    db.InsertDocument('dealers', data, function (err, result) {
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

    }
    router.dealerlist= function (req, res) {
        let data = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var dealersQuery = [
                { "$match": { status: { $ne: 0 } } },
                
                // { $addFields: { dealerOrderCount: { $size: "$dealerIdDetails" } } },

                /* {
                    "$project": {
                        createdAt: 1,
                        updatedAt:
                        {
                            $cond: { if: { $eq: ["$updatedAt", "$createdAt"] }, then: "Admin Not Yet Logged In", else: '$updatedAt' }
                        },
                        name: 1,
                        dealerOrderCount: 1,
                        phone: 1,
                        address: 1

                    }
                }, */
                { "$project": { name: 1, document: "$$ROOT" } }, {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
                }
            ];

            dealersQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

            if (req.body.search) {
                var searchs = req.body.search;
                dealersQuery.push({
                    "$match": {
                        $or: [
                            { "documentData.name": { $regex: searchs + '.*', $options: 'si' } },
                            { "documentData.phone": { $regex: searchs + '.*', $options: 'si' } }
                        ]
                    }

                });
                //search limit
                dealersQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
                dealersQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.limit && req.body.skip >= 0) {
                    dealersQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                dealersQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
                //search limit
            }

            var sorting = {};
            if (req.body.sort) {
                var sorter = 'documentData.' + req.body.sort.field;
                sorting[sorter] = req.body.sort.invoice;
                dealersQuery.push({ $sort: sorting });
            } else {
                sorting["documentData.createdAt"] = -1;
                dealersQuery.push({ $sort: sorting });
            }

            if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                dealersQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            if (!req.body.search) {
                dealersQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
            }

            db.GetAggregation('dealers', dealersQuery, function (err, docdata) {
                console.log(docdata);
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
    }
    router.dealerDetails= function (req, res) {
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

        db.GetOneDocument('dealers',query, {}, {}, function (err, dealer) {
            if (err) {
                returndata.response = err;
                res.send(returndata);
            } else {
                returndata.status = dealer ? 1 : 0;
                returndata.response = dealer;
                res.send(returndata);
            }

        })
    }

router.getdealersList= function (req, res) {
    let data = {
        status: 0,
        response: 'Invalid response'
    }
    try {
        var dealersQuery = [
            { "$match": { status: { $ne: 0 } } },
            
            // { $addFields: { dealerOrderCount: { $size: "$dealerIdDetails" } } },

            /* {
                "$project": {
                    createdAt: 1,
                    updatedAt:
                    {
                        $cond: { if: { $eq: ["$updatedAt", "$createdAt"] }, then: "Admin Not Yet Logged In", else: '$updatedAt' }
                    },
                    name: 1,
                    dealerOrderCount: 1,
                    phone: 1,
                    address: 1

                }
            }, */
            { "$project": { name: 1 ,_id :1} },
             {
                $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$$ROOT" } }
            }
        ];
 
        db.GetAggregation('dealers', dealersQuery, function (err, docdata) {
            console.log(docdata);
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
}  
return router;

}