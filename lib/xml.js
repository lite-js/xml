'use strict';
/**
 * utils module
 * @module utils
 * @see module:index
 */
const lang = require('zero-lang');
const xmlFormat = require('./xml-format');
const domUtils = require('./dom-utils');

const xml = {
  domParser: null, // FIXME: to be initialised
  xmlSerializer: null, // FIXME: to be initialised
  parseFromString: (str) => xml.domParser.parseFromString(xmlFormat.uglify(str, true), 'application/xml'),
  serializeToString: (doc, prettyPrint) => {
    const result = xml.xmlSerializer.serializeToString(doc);
    return prettyPrint ? xmlFormat.beautify(result) : result;
  },
};

lang.extend(xml, {
  parse: xml.parseFromString,
  serialize: xml.serializeToString,
}, xmlFormat, domUtils);

module.exports = xml;
