"use strict";
var db = require("../mongo/connector.js")
var mongo = require('mongodb'), ObjectID = mongo.ObjectID;
var bcrypt = require('bcrypt-nodejs');
//var mailcontent = require('../../model/mailcontent.js');
var async = require('async');
var moment = require('moment');
var dealerModule = require('./../mongo/schema/dealersSchema')

module.exports = function () {

    var router={} 
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
            if (req.body.purchaseAt) {
                data.purchaseDate = new Date(req.body.purchaseAt).getTime();
                data.purchaseAt = new Date(req.body.purchaseAt)
                data.DOP = new Date(req.body.purchaseAt)
                
            }
    
            if (req.body.paid_status == 'paid') {
                data.paid_at = Date.now()
            }
            if (req.body.paidStatus) {
                data.paidStatus = req.body.paidStatus
            }
    
            if (req.body.purchaseDate) {
                data.lastDue = new Date(req.body.purchaseDate).getTime() + ((Number(data.due) * 30) * 24 * 60 * 60 * 1000);
             
            }
            /* return */
            if (req.body.dealer&&req.body.dealer._id) {
                let dealersDetails = await dealerModule.findById({ _id: req.body.dealer._id })
                if(dealersDetails)
                data.dealersId = dealersDetails._id;
                dealer={_id:dealersDetails._id,name:dealersDetails.name}
            } else { 
                // console.log(await dealerModule.save({ name: req.body.company }));
                const IDs =ObjectID();
               const dealers= new dealerModule( {_id:IDs,'name': req.body.dealer.name});
               await dealers.save()
               
                // let dealersDetails = await dealerModule.save({ name: req.body.company })
                data.dealersId =dealers._id;
                data.dealer={_id:dealers._id,name:dealers.name}

            }

            
            if (req.body._id) {
                db.GetOneDocument('purchase', { _id: req.body._id }, {}, {}, function (err, getpurchase) {
                    if (getpurchase.grandTotal !== data.grandTotal) {
                        data.modifiedDetails =  getpurchase.modifiedDetails;
                        data.modifiedDetails.push({
                            "updateAt": new Date(),
                            "dateString": Date.now(),
                            "grandTotal": getpurchase.grandTotal,
                            "vatOne": getpurchase.vatOne,
                            "vatTwo": getpurchase.vatTwo,
                            "amountOne": getpurchase.amountOne,
                            "amountTwo": getpurchase.amountTwo,
                            "totalOne": getpurchase.totalOne,
                            "totalTwo": getpurchase.totalTwo,
                            "paidStatus": getpurchase.paidStatus,
                        })
                    }
                    if (getpurchase.paidStatus !== data.paidStatus) {
                        data.paidStatusDetails = getpurchase.paidStatusDetails;
                        getpurchase.paidStatusDetails.push({ perviousStatus: getpurchase.paidStatus, currentStatus: data.paidStatus, "updateAt": new Date(), "dateString": Date.now() })
                    }
                    db.UpdateDocument('purchase', { _id: req.body._id }, { $set: data }, {}, function (err, docdata) {
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
                db.InsertDocument('purchase', data, function (err, result) {
                console.log('----->',result);
                data.status = 1;
                data.response = result
                res.send(data);
    
                });
            }
        };
   
    router.purchaselist= function (req, res) {
        let data = {
            status: 0,
            response: 'Invalid response'
        }
        try {
            var purchaseQuery = [
                { "$match": { status: { $ne: 0 } } },
                { $lookup: { from: 'dealers', foreignField: '_id', localField: 'dealersId', as: 'dealerDetails' } },
                { $unwind: { path: "$dealerDetails", preserveNullAndEmptyArrays: true } },
                // { $addFields: { customerOrderCount: { $size: "$dealerIdDetails" } } },

                /* {
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
                }, */
                { "$project": { name: 1, document: "$$ROOT" } }, {
                    $group: { "_id": null, "count": { "$sum": 1 }, "documentData": { $push: "$document" } }
                }
            ];

            purchaseQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });

            if (req.body.search) {
                var searchs = req.body.search;
                purchaseQuery.push({
                    "$match": {
                        $or: [
                            { "documentData.name": { $regex: searchs + '.*', $options: 'si' } },
                            { "documentData.phone": { $regex: searchs + '.*', $options: 'si' } }
                        ]
                    }

                });
                //search limit
                purchaseQuery.push({ $group: { "_id": null, "countvalue": { "$sum": 1 }, "documentData": { $push: "$documentData" } } });
                purchaseQuery.push({ $unwind: { path: "$documentData", preserveNullAndEmptyArrays: true } });
                if (req.body.limit && req.body.skip >= 0) {
                    purchaseQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
                }
                purchaseQuery.push({ $group: { "_id": null, "count": { "$first": "$countvalue" }, "documentData": { $push: "$documentData" } } });
                //search limit
            }

            var sorting = {};
            if (req.body.sort) {
                var sorter = 'documentData.' + req.body.sort.field;
                sorting[sorter] = req.body.sort.invoice;
                purchaseQuery.push({ $sort: sorting });
            } else {
                sorting["documentData.createdAt"] = -1;
                purchaseQuery.push({ $sort: sorting });
            }

            if ((req.body.limit && req.body.skip >= 0) && !req.body.search) {
                purchaseQuery.push({ '$skip': parseInt(req.body.skip) }, { '$limit': parseInt(req.body.limit) });
            }
            if (!req.body.search) {
                purchaseQuery.push({ $group: { "_id": null, "count": { "$first": "$count" }, "documentData": { $push: "$documentData" } } });
            }

            db.GetAggregation('purchase', purchaseQuery, function (err, docdata) {
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
    router.purchaseDetails= function (req, res) {
        let returndata = {
            status: 0,
            response: 'Invalid response'
        }
        let query = {} 
        if (req.body._id) {
            query['_id'] = req.body._id
        }
        
        console.log(query);

        db.GetOneDocument('purchase',query, {}, {}, function (err, customer) {
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
    return router;

}