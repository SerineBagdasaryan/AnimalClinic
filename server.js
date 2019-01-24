// server.js

// ============= set up ==============================================================================
var express = require('express');
var app = express();
// const cors = require('cors');
// var multer = require('multer');
// var upload = multer({dest:'uploads'});
//  var fs=require('fs');
var app = express();
app.use(function(req,res,next){
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Origin with value *');

    next();
});

// var http = require('http');
//
//
// http.createServer(function (req, res) {
//
//
//     res.writeHead(200, {
//         'Content-Type': 'application/json',
//         'X-Powered-By': 'bacon'
//     });
//
// });

const mongoose = require('mongoose');             // mongoose for mongodb
const morgan = require('morgan');                 // log requests to the console (express4)
const bodyParser = require('body-parser');        // pull information from HTML POST (express4)
const methodOvveride = require('method-override');// simulate DELETE and PUT (express4)
// const  cors = require("cors");
const database = require ('./config/database');
const port = process.env.PORT || 7777;            // set the port


// ===========  configuration ===================================================================
 mongoose.set('useCreateIndex', true); //  whituot this handle error` DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 mongoose.connect(database.url, { useNewUrlParser: true });          // connect to mongoDB database on modulus.io
 app.use(express.static(__dirname + '/public'));                    // set the static files location /public/img will be /img for users
 app.use(morgan('dev'));                                           // log every request to the console
 app.use(bodyParser.urlencoded({'extended':'true'}));             // parse application/x-www-form-urlencoded
 app.use(bodyParser.json());                                     // parse application/json
 app.use(bodyParser.json({type:'application/vnd.api + json'})); // parse application/vnd.api+json as json
 app.use(methodOvveride());
 // app.use(cors());


// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

 //=============  routes  ===========================================================================
require('./app/routes.js')(app);



//============  listen(start app with node server.js) =============================================
app.listen(port);
console.log(`Server is running on port: ${port}`);