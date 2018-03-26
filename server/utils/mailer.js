/**
 * Created by harttle on 1/5/15.
 */

var nodemailer = require('nodemailer');
var _ = require('lodash');
var config = require('../config');

var transporter = nodemailer.createTransport(config.smtp);

var defaultMail = {
    from: '天马营教程 <' + config.smtp.auth.user + '>',
    subject: 'test',
    //to: 'bar@blurdybloop.com, baz@blurdybloop.com',
    //text: 'test text',
    html: '<b>test html</b>'
};

function sendMail(mail){
    mail = _.merge({}, defaultMail, mail);

    transporter.sendMail(mail, function(error, info){
        if(error) return console.log('mail sent error', config.smtp, mail, error);
        console.log('Message sent: ' + info.response);
    });
}

module.exports = {
    send: sendMail
};
