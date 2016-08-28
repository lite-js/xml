'use strict';
/**
 * xml2js module
 * @module xml2js
 * @see module:index
 */
const xml = require('./xml');
const dom2js = require('./dom2js');

module.exports = (text) => dom2js(xml.parse(text));
