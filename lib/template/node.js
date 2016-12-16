const lang = require('zero-lang');
const __e = require('../escape');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function(tag, stringifiedAttributes, content) {
        __p += '<' +
            ((__t = (tag)) == null ? '' : __e(__t)) +
            '' +
            ((__t = (stringifiedAttributes)) == null ? '' : __e(__t)) +
            '>' +
            ((__t = (content)) == null ? '' : __t) +
            '</' +
            ((__t = (tag)) == null ? '' : __e(__t)) +
            '>\n';;
        return __p;
    })(data.tag, data.stringifiedAttributes, data.content);
};