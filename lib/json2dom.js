'use strict';
/**
 * json2xml module
 * @module json2xml
 * @see module:index
 */
const js2dom = require('./js2dom');

module.exports = (text) => js2dom(JSON.parse(text));
