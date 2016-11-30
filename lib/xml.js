'use strict';
/**
 * utils module
 * @module utils
 * @see module:index
 */
const lang = require('zero-lang');
const xmlFormat = require('./xml-format');
const domUtils = require('./dom-utils');

const PARSER_ERROR_TAG = 'parsererror';
const XML_DOCTYPE = 'text/xml';

const xml = {
  domParser: null, // FIXME: to be initialised
  xmlSerializer: null, // FIXME: to be initialised

  getParserErrorNS: () => {
    const errorneousParse = xml.domParser.parseFromString('<', XML_DOCTYPE);
    return errorneousParse.getElementsByTagName(PARSER_ERROR_TAG)[0].namespaceURI;
  },

  isParserError: (parsedDom, str) => {
    // for xmldom: xml with only "text element"
    if (
      parsedDom.childNodes.length === 0 || (
        parsedDom.childNodes.length === 1 &&
        parsedDom.firstChild.nodeType === domUtils.TEXT_NODE &&
        parsedDom.firstChild.data === str
      )
    ) {
      return true;
    }
    try {
      xml.parserErrorNS = xml.parserErrorNS || xml.getParserErrorNS();
      if (xml.parserErrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDom.getElementsByTagName(PARSER_ERROR_TAG).length > 0;
      }
      return parsedDom.getElementsByTagNameNS(xml.parserErrorNS, PARSER_ERROR_TAG).length > 0;
    } catch (e) {
    }
  },

  parseFromString: (str) => {
    const uglifiedStr = xmlFormat.uglify(str, true);
    const dom = xml.domParser.parseFromString(uglifiedStr, XML_DOCTYPE);
    if (xml.isParserError(dom, uglifiedStr)) {
      throw new SyntaxError(`invalid XML: ${str}`);
    }
    return dom;
  },
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
