var mongoose = require('mongoose')
var schema = mongoose.Schema

var articleSchema = new schema({
  "articleId": String,
  "title": String,
  "tag": String,
  "describtion": String,
  "createDate": String,
  "content": String,
  "comment": [
    {
      "name": String,
      "email": String,
      "content": String,
      "dateTime": String,
      "comment_response": [
        {
          "response_name": String,
          "response_email": String,
          "response_content": String,
          "response_dateTime": String
        }
      ]
    }
  ]
})

module.exports = mongoose.model('Article', articleSchema)
