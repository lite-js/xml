'use strict';
/**
 * index-browser module
 * @module index-browser
 * @see module:index
 */
const lang = require('zero-lang');
const dom2js = require('./dom2js');
const dom2json = require('./dom2json');
const escape = require('./escape');
const getInnerXML = require('./get-inner-xml');
const js2xml = require('./js2xml');
const json2xml = require('./json2xml');
const sanitize = require('./sanitize');
const unescape = require('./unescape');
const xml = require('./xml-lite');
const xml2js = require('./xml2js');
const xml2json = require('./xml2json');

lang.extend(xml, {
  ENV: 'browser',
  dom2js,
  dom2json,
  domParser: new DOMParser(),
  escape,
  getInnerXML,
  getOuterXML: xml.serialize,
  js2xml,
  json2xml,
  sanitize,
  unescape,
  xml2js,
  xml2json,
  xmlSerializer: new XMLSerializer(),
});

module.exports = xml;
