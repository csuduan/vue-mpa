var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig=require('swig');
var multipart = require('connect-multiparty');



var mongoose = require('mongoose');
var config = require('../config');


// mongoose setup
mongoose.connect(config.server.mongodb);
mongoose.connection.on("connected", function () {
    console.log("MongoDB connect "+config.server.mongodb+" success");
});
mongoose.connection.on("error", function (error) {
    console.log("MongoDB connect  "+config.server.mongodb+" fail："+error);
});
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connect disconnected");
});


// passport setup
//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());


// 默认开发模式，生产模式待开发
var app = express();
app.set('port', config.server.port);


app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}));
app.use(cookieParser());
//app.use(favicon(__dirname + '/favicon.ico'));

app.use('/',express.static(config.build.assetsRoot));

// routes

var route = require('./routes')
route(app)




console.log('> Starting multiSpa server...')


app.listen(app.get('port'), function() {
  var uri = 'http://localhost:' + app.get('port')
  console.log('> Server Started at uri:'+uri);
});


var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})
module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}


