var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatar: {
        type: String,
        default: '/images/default-avatar.jpeg'
    },
    title: {
        type: String,
        default: '未命名博客'
    },
    description: {
        type: String,
        default: '博主很懒，还没有添加任何描述……'
    },
    active: {
        type: Boolean,
        default: false
    },
    activeToken: String,
    activeExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// UserSchema.plugin(passportLocalMongoose, {
//     incorrectUsernameError: '用户名不正确',
//     incorrectPasswordError: '密码不正确',
//     userExistsError: '用户名已存在'
// });


// UserSchema.path('username').validate(function (email) {
//     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.test(email);
// }, '用户名不是有效的电子邮件地址');

module.exports = mongoose.model('User', UserSchema);
