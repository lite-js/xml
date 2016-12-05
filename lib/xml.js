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
const EMPTY_DOCUMENT_ERROR = new SyntaxError('error on line 1 at column 1: Document is empty');

const xml = {
  domParser: null, // FIXME: to be initialised
  xmlSerializer: null, // FIXME: to be initialised

  getParserErrorNS: () => {
    const errorneousParse = xml.domParser.parseFromString('<', XML_DOCTYPE);
    return errorneousParse.getElementsByTagName(PARSER_ERROR_TAG)[0].namespaceURI;
  },

  getParserErrorMsg: (parserErrorTag) => {
    const msgTag = xml.findOrCreateChildNode(parserErrorTag, {
      tagName: 'div'
    });
    return msgTag.textContent; // DOM level 3
  },

  getParserError: (parsedDom, str) => {
    // for xmldom: xml with only "text element" // empty Document
    if (
      parsedDom.childNodes.length === 0 || (
        parsedDom.childNodes.length === 1 &&
        parsedDom.firstChild.nodeType === domUtils.TEXT_NODE &&
        parsedDom.firstChild.data === str
      )
    ) {
      return EMPTY_DOCUMENT_ERROR;
    }
    try {
      let errorTag;
      xml.parserErrorNS = xml.parserErrorNS || xml.getParserErrorNS();
      if (xml.parserErrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        errorTag = parsedDom.getElementsByTagName(PARSER_ERROR_TAG)[0];
      }
      errorTag = parsedDom.getElementsByTagNameNS(xml.parserErrorNS, PARSER_ERROR_TAG)[0];
      if (errorTag) {
        return new SyntaxError(xml.getParserErrorMsg(errorTag));
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  parseFromString: (str) => {
    const uglifiedStr = xmlFormat.uglify(str, true);
    const dom = xml.domParser.parseFromString(uglifiedStr, XML_DOCTYPE);
    const parserError = xml.getParserError(dom, uglifiedStr);
    // const dom = xml.domParser.parseFromString(str, XML_DOCTYPE);
    // const parserError = xml.getParserError(dom, str);
    if (parserError) {
      throw new SyntaxError(`invalid XML: ${parserError}.`);
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
