'use strict';
/**
 * index-browser module
 * @module index-browser
 * @see module:index
 */
const lang = require('zero-lang');
const xml = require('./xml');
const dom2js = require('./dom2js');
const dom2json = require('./dom2json');
const js2xml = require('./js2xml');
const json2xml = require('./json2xml');
const xml2js = require('./xml2js');
const xml2json = require('./xml2json');
const sanitize = require('./sanitize');

lang.extend(xml, {
  env: 'browser',
  dom2js,
  dom2json,
  js2xml,
  json2xml,
  sanitize,
  xml2js,
  xml2json,
  domParser: new DOMParser(),
  xmlSerializer: new XMLSerializer(),
});

module.exports = xml;
