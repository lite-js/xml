'use strict';
/**
 * index-browser module
 * @module index-browser
 * @see module:index
 */
const lang = require('zero-lang');
const utils = require('./utils');

lang.extend(utils, {
  domParser: new DOMParser(),
  xmlSerializer: new XMLSerializer(),
});

const XMLLite = {
};

lang.extend(XMLLite, utils);

module.exports = XMLLite;
