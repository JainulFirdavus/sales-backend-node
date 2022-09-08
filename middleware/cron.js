/* var request = require("request");

var options = {
 
    method: 'POST',
    // url: 'https://2factor.in/API/V1/01245b43-ca1f-11eb-8089-0200cd936042/ADDON_SERVICES/SEND/PSMS',
    url: 'https://2factor.in/API/V1/293832-67745-11e5-88de-5600000c6b13/ADDON_SERVICES/SEND/PSMS',
    
    'headers': {
        'Content-Type': 'multipart/form-data'
    },
    form: {
        "From": "TFCTOR",
        "Msg": "Hello",
        "To": '9597070570',

    }
    //   body: '{}'
    // body: {    "From": "TFCTOR",   "Msg": `Hi janul, this is a reminder that you have an upcoming appointment with BlueVison on Today`, "To": 9911991198  }
};

request(options, function (error, response, body) {
    //if (error) throw new Error(error);
    console.log(error);
    console.log(body);
});

var CronJob = require('cron').CronJob;
var job = new CronJob('0 8 * * *', function () {
    console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
job.start(); */


var db = require("../mongo/connector.js")

var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function () {
    let returndata = {
        status: 0,
        response: 'Invalid response'
    }
    try {


        var data = { status: { $ne: 0 } }
       
            let from = new Date().setHours(0, 0, 0, 0);
            let to = from.valueOf() + 1000 * 3600 * 24;
            console.log("req.body.date", new Date(from), new Date(to));
            data['lastDue'] = {/*  $gte: from, */ $lte: to };
        
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
    
        
        db.GetAggregation('invoice', invoiceQuery, function (err, docdata) {
            console.log(err, docdata);
           return
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
        console.log('* * * * * *',error);
    }
}, null, true, 'America/Los_Angeles');

job.start();