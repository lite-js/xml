const lang = require('zero-lang');
const __e = require('../sanitize');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function(tag, data) {
        __p += '<?' +
            ((__t = (tag)) == null ? '' : __e(__t)) +
            '';
        if (data) {
            __p += '' +
                ((__t = (' ' + data)) == null ? '' : __e(__t)) +
                '';
        }
        __p += '?>\n';;
        return __p;
    })(data.tag, data.data);
};