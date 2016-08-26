'use strict';
/**
 * json2xml module
 * @module json2xml
 * @see module:index
 */
const js2xml = require('./js2xml');

module.exports = (text, options) => js2xml(JSON.parse(text), options);
