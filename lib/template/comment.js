const lang = require('zero-lang');
const __e = require('../escape');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function(data) {
        __p += '<!--' +
            ((__t = (data)) == null ? '' : __e(__t)) +
            '-->\n';;
        return __p;
    })(data.data);
};