var mailer = require('nodemailer');
var fs = require('fs')
var unirest = require("unirest");
const CONFIG = require("../config/config")

function groupChildren(obj) {
    for (prop in obj) {
        if (typeof obj[prop] === 'object') {
            groupChildren(obj[prop]);
        } else {
            obj['$'] = obj['$'] || {};
            obj['$'][prop] = obj[prop];
            delete obj[prop];
        }
    }

    return obj;
}
function sendmail(file, filename, cb) {
    let mailAccount = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            customer: 'jazlogic@gmail.com', // generated ethereal customer
            pass: 'jain252026', // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    fs.readFile(file, function (err, data) {
        mailAccount.sendMail({
            sender: 'jazlogic@gmail.com',
            to: 'elakiyabharathy@gmail.com', // jainulfirdavus@gmail.com
            subject: 'Blue Vision Reports',
            text: 'Blue Vision Auto Export Reports, generated  on ' + new Date() + '',
            body: 'Blue Vision Auto Export Reports, generated  on ' + new Date() + '',
            attachments: [{ 'filename': filename, 'content': data }]
        }), function (err, success) {
            if (err) {
                // Handle error
                cb('failed', null)
            } else {
                cb(null, 'success')
            }

        }
    });
}


function bulksms(phone_no, date) {
    try { 
        if (CONFIG.smsMode == true) {
            var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
            req.headers({
                "authorization": CONFIG.smsApi
            });
			let to = phone_no.toString() 
		 
            req.form({
                "sender_id": CONFIG.smsSenderId,
                "message": `Dear Customer, Your next visiton (${date}). Blue vision, Working Hours: MON-SAT 9.30 AM TO 9 PM | SUN 9 AM to 5PM CONTACT NO: +91-7540077545`,
                "route": "v3",
                "numbers": to,
            });
            req.end(function (res) {
                if (res.error) {
                    console.log(res.body, "---SMS ERROR---"); 
                }else{
				 console.log(res.body, "---SMS---"); 
				 
				}
            });
        }
    } catch (error) {
        console.log(error, '---error---');
    }
}



module.exports = {
    "groupChildren": groupChildren,
    "sendmail": sendmail,
    "bulksms": bulksms
}