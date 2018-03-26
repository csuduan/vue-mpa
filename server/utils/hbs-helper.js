/**
 * Created by harttle on 1/7/15.
 */

module.exports = function(hbs) {
    hbs.registerHelper('detailDate', function(date, block) {
        return dateFormat(date, 'yyyy-MM-dd hh:mm:ss');
    });

    hbs.registerHelper('excerpt', mdExcerpt);

    hbs.registerHelper('equal', function(v1, v2, opts) {
        return v1 == v2 ? opts.fn(this) : opts.inverse(this);
    });

    hbs.registerHelper('unless', function(v1, opts) {
        return v1 ? opts.inverse(this) : opts.fn(this);
    });
};

function mdExcerpt(content) {
    var result = content.replace(/[#\(\)\[\]\n!`]+/g, ' ');
    if (result.length > 300)   result = result.slice(0, 300) + '...';
    return result;
}

function dateFormat(datetime, format) {
    var date = {
        "M+": datetime.getMonth() + 1,
        "d+": datetime.getDate(),
        "h+": datetime.getHours(),
        "m+": datetime.getMinutes(),
        "s+": datetime.getSeconds(),
        "q+": Math.floor((datetime.getMonth() + 3) / 3),
        "S+": datetime.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] :
                ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}