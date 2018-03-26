/**
 * Created by harttle on 1/12/15.
 */

var cfg = require('../config');

module.exports = function (req, res, next) {

    res.locals.req = req;
    res.locals.res = res;
    res.locals.config = cfg;

    next();
};