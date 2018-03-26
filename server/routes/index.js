const articles = require('./articles')
const messages = require('./messages')
const admin = require('./admin')
const config=require('../../config')
const path = require('path')

module.exports = (app) => {
  app.use(articles)
  app.use(messages)
  app.use(admin)




  app.use('/demo(/*)?', function (req, res) {
    res.sendFile(config.build.assetsRoot+'/demo.html')
  });

  app.use('/blog(/*)?', function (req, res) {
    res.sendFile(config.build.assetsRoot+'/blog.html')
  });
  app.use('/blogadmin(/*)?', function (req, res) {
    res.sendFile(config.build.assetsRoot+'/blogadmin.html')
  });

  app.use('/test', function (req, res) {
    res.json({message: ' welcome to our api!'});
  });


}
