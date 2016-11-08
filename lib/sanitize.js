'use strict';
/**
 * sanitize module
 * @module sanitize
 * @see module:index
 */
const lang = require('zero-lang');

const chars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};
function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

module.exports = (str, reverse) => {
  if (!lang.isString(str)) return str;

  let result = str;
  lang.forIn(chars, (value, key) => {
    if (reverse) {
      result = result.replace(new RegExp(escapeRegExp(value), 'g'), key);
    } else {
      result = result.replace(new RegExp(escapeRegExp(key), 'g'), value);
    }
  });
  return result;
};
