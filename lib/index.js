'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
const xmldom = require('xmldom');
const utils = require('./utils');

lang.extend(utils, {
  domParser: new xmldom.DOMParser(),
  xmlSerializer: new xmldom.XMLSerializer(),
});

const XMLLite = {
};

lang.extend(XMLLite, utils);

module.exports = XMLLite;
