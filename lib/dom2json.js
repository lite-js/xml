'use strict';
/**
 * dom2json module
 * @module dom2json
 * @see module:index
 */
const dom2js = require('./dom2js');

module.exports = (dom, replacer, space) => JSON.stringify(dom2js(dom), replacer, space);
