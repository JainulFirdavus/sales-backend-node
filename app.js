const express = require('express');
const app = express();
const path = require('path');
const CONFIG = require('./config/config.js');
var morgan = require('morgan')
const bodyParser = require('body-parser') // $ npm install body-parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '100mb' })); // bodyParser - Initializing/Configuration

const mongoose = require('mongoose');
mongoose.connect(CONFIG.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
let db = mongoose.connection;
db.on('error', function (error) { console.error('Error in MongoDB Connection: ' + error); });
db.on('reconnected', function () { console.log('MongoDB Reconnected !'); });
db.on('disconnected', function () { console.log('MongoDB Disconnected !'); });
db.on('connected', function () { console.log('MongoDB Connenected !'); });
app.use('/uploads', express.static(path.join(__dirname, '/uploads'), { maxAge: 7 * 86400000 }));
app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  console.log('====>', req.originalUrl)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  next();
});
app.use(morgan('dev'))


require("./routes")(app);
// require("./middleware/cron");
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


try {
  app.listen(CONFIG.PORT, function () { console.log("connected to ", CONFIG.PORT); })
} catch (ex) {
  console.log("Server not connectede", ex);
}