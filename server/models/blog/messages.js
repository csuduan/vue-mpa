var mongoose = require('mongoose')
var schema = mongoose.Schema

var messageSchema = new schema({
  "messageId": String,
  "name": String,
  "email": String,
  "content": String,
  "createDate": String
})

module.exports = mongoose.model('Message', messageSchema)
