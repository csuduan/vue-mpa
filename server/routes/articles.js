require('./../utils/time')
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var trimHtml = require('trim-html');


var Article = require('./../models/blog/articles')
var Message = require('./../models/blog/messages')



/* GET users listing. */
router.get('/api/', function(req, res, next) {
  res.send('respond with a resource');
});

// 分页检索文章
router.get("/api/articleList", function (req,res) {
  let page = parseInt(req.param("page")) //浏览器参数第几页
  let pageSize = parseInt(req.param("pageSize")) //当前一页多少个
  let skip = (page - 1)*pageSize
  let ArticleModal = Article.find().select('articleId title tag content createDate').skip(skip).limit(pageSize).sort({_id:-1}).lean()

  ArticleModal.exec(function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
      })
    } else {
      doc.forEach(function (item) {
        item.content = trimHtml(item.content, {limit: 100})
      })
      res.json ({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 文章详情
router.get("/api/articleDetial", function (req,res) {
  let articleId = req.query.articleId
  Article.findOne({articleId:articleId}, function (err,doc) {
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
        result: doc
      })
    }
  })
})

// 查询标签
router.get("/api/articleTags", function (req,res) {
  Article.find().select('tag -_id').exec(function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
      })
    } else {
      res.json ({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})

// 按标签显示
router.get("/api/tagsDetial", function (req,res) {
    let tag = req.param("tag")
    let page = parseInt(req.param("page")) //浏览器参数第几页
    let pageSize = parseInt(req.param("pageSize")) //当前一页多少个
    let skip = (page - 1)*pageSize
    let ArticleModal = Article.find({tag:tag}).select('articleId title tag content createDate').skip(skip).limit(pageSize).sort({_id:-1}).lean()

    ArticleModal.exec(function (err,doc) {
      if (err) {
        res.json ({
          status: "1",
          msg: err.message,
        })
      } else {
        doc.forEach(function (item) {
          item.content = trimHtml(item.content, {limit: 100})
        })
        res.json ({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      }
    })
})
module.exports = router
