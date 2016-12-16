'use strict';
/**
 * get-inner-xml module
 * @module get-inner-xml
 * @see module:index
 */
const lang = require('zero-lang');
const xml = require('./xml-lite');

module.exports = node => {
  const children = node.childNodes;
  return lang.map(children, child => xml.serialize(child)).join('');
};
