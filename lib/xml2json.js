'use strict';
/**
 * xml2json module
 * @module xml2json
 * @see module:index
 */
const xml2js = require('./xml2js');

module.exports = (text, replacer, space) => JSON.stringify(xml2js(text), replacer, space);
