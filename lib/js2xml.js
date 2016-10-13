'use strict';
/**
 * js2xml module
 * @module js2xml
 * @see module:index
 */
const lang = require('zero-lang');
const xmlFormat = require('./xml-format');
const tplComment = require('./template/comment');
const tplNode = require('./template/node');
const tplProcessingInstruction = require('./template/processing-instruction');

function js2xml(obj) {
  if (obj.type === 8 /* 'Comment' */) return tplComment(obj);
  if (obj.type === 3 /* 'TextNode' */) return obj.text || '';
  if (obj.type === 7 /* 'ProcessingInstruction' */) return tplProcessingInstruction(obj);
  const content = lang.map(obj.children || [], (child) => js2xml(child)).join('');
  if (obj.type === 9 /* 'Document' */) return content;
  return tplNode(lang.extend({
    attributes: obj.attributes || {},
    content,
    tag: obj.tag || '',
  }, obj));
}

module.exports = (obj, options) => {
  options = options || {};
  const result = js2xml(obj);
  if (options.beautify) return xmlFormat.beautify(result, options.indent);
  return xmlFormat.uglify(result, options.preserveComments);
};
