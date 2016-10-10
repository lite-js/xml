'use strict';
/**
 * escape module
 * @module escape
 * @see module:index
 */
const sanitize = require('./sanitize');

module.exports = str => sanitize(str);
