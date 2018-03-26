/**
 * Created by harttle on 1/5/15.
 */


function requestLogger(req, res, next) {
    console.log('------------------------------');
    console.log('REQUEST');
    console.log(req.ip, req.method, req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log(req.body);
    next();
}

function responseLogger(req, res, next) {
    var oldWrite = res.write,
        oldEnd = res.end;
    var chunks = [];
    res.write = function(chunk) {
        chunks.push(chunk);
        oldWrite.apply(res, arguments);
    };
    res.end = function(chunk) {
        if (chunk) chunks.push(chunk);
        var body = Buffer.concat(chunks).toString('utf8');

        console.log('------------------------------');
        console.log('RESPONSE');
        console.log(body);

        oldEnd.apply(res, arguments);
    };
    next();
}

function logger(){
    // 这里可以对log进行处理、存储等操作
    console.log.apply(this, arguments);
}

module.exports = {
    log: logger,
    request: requestLogger,
    response: responseLogger
};