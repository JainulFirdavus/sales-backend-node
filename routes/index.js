module.exports = function (app) {
    const jwt = require('jsonwebtoken');
    const CONFIG = require('../config/config')
    const cron = require('node-cron');
    const customers = require('../controllers/customers.js')();
    const invoice = require('../controllers/invoices.js')();
    const admin = require('../controllers/admin.js')(); 
    const dealer = require('../controllers/dealers.js')();
    const purchase = require('../controllers/purchase.js')();
    const employee = require('../controllers/employee.js')();
    const vaildate = require("../middleware/customer-valitation.js")();


    function authenticateToken(req, res, next) {
        next()
        return;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log("authenticateToken ->token", token);
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, CONFIG.SECRET_KEY, (err, customer) => {
            console.log(err, customer)
            if (err) return res.sendStatus(403)
            req.customer = customer;
            next()
        })
    }
    try {

 //employee

        app.post("/employee/login", authenticateToken, employee.login);
        app.post("/employee/getDeatils", authenticateToken, employee.getDeatils);
        app.post("/employee/register", authenticateToken, employee.register);
        
        
        //customer
        app.post("/customers/customers-save", authenticateToken, customers.save);
        app.post("/customers/customers-list", authenticateToken, customers.customerslist);
        app.post("/customer/customerDetails", authenticateToken, customers.customerDetails);
        // app.post("/customer/customerVisit", authenticateToken, customers.customerVisit);
        // app.post("/customer/sendmessage", authenticateToken, customers.sendmessage);


        //invoice
        app.get("/invoice/lastinvoice", authenticateToken, invoice.lastinvoice);
        app.post("/invoice/save", authenticateToken, invoice.save);
        app.post("/invoice/getinvoices", authenticateToken, invoice.getinvoices);
        app.post("/invoice/userinvoiceList", authenticateToken, invoice.userinvoiceList);
        app.post("/invoice/getinvoicesId", authenticateToken, invoice.getinvoicesId);
        app.post("/invoice/invoiceExport", authenticateToken, invoice.invoiceExport);
        app.post("/invoice/getoverDue", authenticateToken, invoice.getoverDue);
        

        app.post("/invoice/invoiceReport", authenticateToken, invoice.invoiceReport);

        app.post("/admin/getsettings", authenticateToken, admin.getsettings);
        app.post("/admin/getsettingsDetails", authenticateToken, admin.getsettingsDetails);
        app.post("/admin/savesettings", authenticateToken, admin.savesettings);

        app.post("/dashboard/invoiceDetails", authenticateToken, admin.dashoardDetails);
        app.post("/dashboard/getChartInvoice", authenticateToken, admin.getChartInvoice);
        

        
        // //purchase
        app.post("/purchase/save", authenticateToken, purchase.save);
        app.post("/purchase/list", authenticateToken, purchase.purchaselist);
        app.post("/purchase/Details", authenticateToken, purchase.purchaseDetails);

        //dealer
        app.post("/dealers/save", authenticateToken, dealer.save);
        app.post("/dealers/list", authenticateToken, dealer.dealerlist);
        app.post("/dealers/Details", authenticateToken, dealer.dealerDetails);
        app.post("/dealers/getdealersList", authenticateToken, dealer.getdealersList);
       
       


        // cron.schedule('* 8 * * *', function () {
        //     // cron.schedule('*/10 * * * * * ', function () {
        //     // console.log("sdds");
        //     invoice.smsSchedule()
        // }, {
        //     scheduled: true,
        //     timezone: "Asia/Kolkata"
        // });
       
           
    }
    catch (e) {
        console.log('erroe in index.js---------->>>>', e);
    }
};