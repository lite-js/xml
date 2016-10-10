'use strict';
/**
 * unescape module
 * @module unescape
 * @see module:index
 */
const sanitize = require('./sanitize');

module.exports = str => sanitize(str, true);
