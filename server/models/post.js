/**
 * Created by harttle on 1/5/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true},
    content: String,
    date: {type: Date, default:Date.now},
    author: {type: String, ref: 'User'},
    comments: [{type: String, ref: 'Comment'}]
});

module.exports = mongoose.model('Post', PostSchema);
