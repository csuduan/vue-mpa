var mongoose = require('mongoose')
var schema = mongoose.Schema

var userSchema = new schema({
  "userId": String,
  "account": String,
  "password": String
})

module.exports = mongoose.model('User', userSchema)
