/* eslint-env browser */
const assignIn = require('lodash/assignIn')
const dom2js = require('./lib/dom2js')
const dom2json = require('./lib/dom2json')
const escape = require('./lib/escape')
const getInnerXML = require('./lib/getInnerXml')
const js2xml = require('./lib/js2xml')
const json2xml = require('./lib/json2xml')
const sanitize = require('./lib/sanitize')
const unescape = require('./lib/unescape')
const xml = require('./lib/xml')
const xml2js = require('./lib/xml2js')
const xml2json = require('./lib/xml2json')

assignIn(xml, {
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
  xmlSerializer: new XMLSerializer()
})

module.exports = xml
