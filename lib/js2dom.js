'use strict';
/**
 * json2xml module
 * @module json2xml
 * @see module:index
 */
const js2xml = require('./js2xml');
const xml = require('./xml-lite');

module.exports = (obj) => xml.parse(js2xml(obj));
