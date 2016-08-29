const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    

    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };

    return (function(attributes, tag, content) {
        __p += '';
        var attrs = lang.keys(attributes);
        __p += '<' +
            ((__t = (tag)) == null ? '' : __t) +
            '';
        if (attrs.length) {
            __p += '' +
                ((__t = (' ' + lang.map(attrs, function(attr) {
                    return attr + '="' + attributes[attr] + '"';
                }).join(' '))) == null ? '' : __t) +
                '';
        }
        __p += '>' +
            ((__t = (content)) == null ? '' : __t) +
            '</' +
            ((__t = (tag)) == null ? '' : __t) +
            '>\n';;
        return __p;
    })(data.attributes, data.tag, data.content);
};