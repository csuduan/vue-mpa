require('./../utils/time')
var trimHtml = require('trim-html');
let express = require('express');
let md5 = require('md5');
let router = express.Router();
var uuid = require('node-uuid')
var fs = require('fs');

let Article = require('./../models/blog/articles')
let User = require('./../models/blog/users')
let Tags = require('./../models/blog/tags')

var qiniu = require("qiniu");
// 文章列表
router.get("/api/articleList_admin", function (req,res) {
  let page = parseInt(req.param("page")) //浏览器参数第几页
  let pageSize = parseInt(req.param("pageSize")) //当前一页多少个
  let skip = (page - 1)*pageSize
  let ArticleModal = Article.find().skip(skip).limit(pageSize).sort({_id:-1}).lean()

  ArticleModal.exec(function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
      })
    } else {
        doc.forEach(function (item) {
            item.content = trimHtml(item.content, {limit: 100}).html
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

// 发布文章
router.post("/api/articleSub", function (req,res) {
  let title = req.body.title
  let tag = req.body.tag
  let describtion = req.body.describtion
  let content = req.body.content

  let random = Math.floor(Math.random()*10)
  let sysDate = new Date().Format('yyyMMddhhmmss')
  let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
  let articleId = sysDate +random

  let article = {
      "articleId": articleId,
      "title": title,
      "tag": tag,
      "describtion": describtion,
      "createDate": createDate,
      "content": content
  }
  Article.create(article, function (err,doc) {
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

// 删除文章
router.post("/api/articleDelete", function (req,res) {
  let articleId = req.body.articleId
  Article.remove({articleId:articleId}, function (err,doc) {
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

// 修改文章
router.post("/api/articleModify", function (req,res) {
  let content = req.body.content
  let articleId = req.body.articleId
  Article.findOneAndUpdate({articleId:articleId}, {$set: {content:content}}, function (err,doc) {
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

// 登录管理界面
router.get("/api/login", function (req,res) {
  let account = req.query.account
  let password = req.query.password

    /*User.insertMany([{account:"a",password:"123"}],function(err,docs){
        //[ { __v: 0, name: 'a', _id: 59720ea1bbf5792af824b30c },
        //{ __v: 0, name: 'b', _id: 59720ea1bbf5792af824b30d } ]
        console.log(docs);
    });*/

    User.find(function(err,docs){

        console.log(docs);
    }
        )
  User.findOne({account:account}).lean().exec(function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
        result:''
      })
        console.log( err.message)
    } else {
      console.log(doc)
      if (!doc.password) {
        res.json ({
          status: "1",
          msg: '',
          result: '无此用户'
        })
      } else {
          let pwd = md5(doc.password)
          doc.password = md5(doc.password)
          if (password == pwd) {
            res.json ({
              status: '0',
              msg: '',
              result: doc
            })
          } else {
            res.json ({
              status: '1',
              msg: '',
              result: doc
            })
          }
        }
    }
  })
})

// 标签列表
router.get("/api/tags", function (req,res) {
  Tags.find(function (err,doc) {
    if (err) {
      res.json ({
        status: "1",
        msg: err.message,
      })
    } else {
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

// 删除标签
router.post("/api/tagsDelete", function (req,res) {
  let tagDel = req.body.tagDel
  Tags.remove({name:tagDel}, function (err,doc) {
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

// 添加标签
router.post("/api/tagsAdd", function (req,res) {
  let tagAdd = req.body.tagAdd
  Tags.create({name:tagAdd}, function (err,doc) {
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

// 添加图片
router.post("/api/imgAdd", function (req,res) {

    let image=req.body.image
    let base64Data = image.miniurl.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');




    //保存图片到七牛

    var accessKey = '1mVvZkcX-0jBn8UOY4Vr7fvDT0dqxDLMkBvSIhHT';
    var secretKey = 'slYzSxIV0yayB834HLcESIAqrIyO-WORgEcsf1Ka';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var bucket = 'myspace';
    var key = uuid.v1()+".jpg"
    var config = new qiniu.conf.Config();
    var formUploader = new qiniu.form_up.FormUploader(config);

    var options = {
        scope: bucket,
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let token =putPolicy.uploadToken(mac);


    var extra = new qiniu.form_up.PutExtra();

    var url="http://p2n5cx9yi.bkt.clouddn.com/"+key
    formUploader.put(token, key, dataBuffer, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
            res.send(url);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
            res.send(0);
        }
    });

    //保存图片到本地
    /*let localurl="src/dist"+url
    fs.writeFile(localurl, dataBuffer, function(err) {
        if(err){
            res.send(0);
        }else{
            res.send(url);
        }
    });*/






})
module.exports = router
