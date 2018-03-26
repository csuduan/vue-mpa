require('./../utils/time')
var express = require('express');
var router = express.Router();
var md5 = require('md5')

var Message = require('./../models/blog/messages')

// 发布留言
router.post("/api/messageSub", function (req,res) {
  let name = req.body.name
  let email = req.body.email
  let content = req.body.content

  let random = Math.floor(Math.random()*10)
  let sysDate = new Date().Format('yyyMMddhhmmss')
  let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')

  let messageId = sysDate +random

  let message = {
      "messageId": messageId,
      "name": name,
      "email": email,
      "content": content,
      "createDate": createDate
  }

  Message.create(message, function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
        result:''
      })
    } else {
      res.json ({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

// 获取留言列表
router.get("/api/messageList", function (req,res) {
  let limit = parseInt(req.query.limit)
  Message.find().sort({_id:-1}).limit(limit).lean().exec( function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
        result:''
      })
    } else {
      doc.forEach(function (item) {
        item.email = md5(item.email)
      })
      res.json ({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})
module.exports = router
