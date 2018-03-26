//init db
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




//other
