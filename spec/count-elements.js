'use strict';
/**
 * count-elements module
 * @module count-elements
 * @see module:index
 */
import lang from 'zero-lang';

module.exports = (elements) => {
  let count = 0;

  function countOne(obj) {
    if (obj.type !== 'Document' && obj.type !== 'TextNode') {
      count++;
    }
    if (obj.children) {
      lang.each(obj.children, (child) => {
        countOne(child);
      });
    }
  }

  countOne(elements);
  return count;
};
