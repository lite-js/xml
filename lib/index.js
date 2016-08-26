'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
const xmldom = require('xmldom');
const xml = require('./xml');
const dom2js = require('./dom2js');
const js2xml = require('./js2xml');
const json2xml = require('./json2xml');
const xml2js = require('./xml2js');
const xml2json = require('./xml2json');

lang.extend(xml, {
  dom2js,
  js2xml,
  json2xml,
  xml2js,
  xml2json,
  domParser: new xmldom.DOMParser(),
  xmlSerializer: new xmldom.XMLSerializer(),
});

module.exports = xml;
