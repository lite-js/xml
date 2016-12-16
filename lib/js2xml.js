'use strict';
/**
 * js2xml module
 * @module js2xml
 * @see module:index
 */
const lang = require('zero-lang');
const tplComment = require('./template/comment');
const tplNode = require('./template/node');
const tplProcessingInstruction = require('./template/processing-instruction');
const xml = require('./xml-lite');
const xmlFormat = require('./xml-format');

function escapeDoubleQuotes(value) {
  return value.replace(/"/g, '&quot;');
}
function escapeSingleQuotes(value) {
  return value.replace(/'/g, '&apos;');
}

function stringifyAttribute(attrs, key, keepDoubleQuotes) {
  const value = attrs[key];
  if (keepDoubleQuotes) {
    return `${key}='${escapeSingleQuotes(value)}'`;
  }
  return `${key}="${escapeSingleQuotes(escapeDoubleQuotes(value))}"`;
}

function stringifyAttributes(attrs) {
  const keepDoubleQuotes = xml.keepDoubleQuotes;
  const keys = lang.keys(attrs);
  if (keys.length) {
    return ` ${lang.map(keys, (key) => `${stringifyAttribute(attrs, key, keepDoubleQuotes)}`).join(' ')}`;
  }
  return '';
}


function js2xml(obj) {
  /* 'Comment' */
  if (obj.type === xml.COMMENT_NODE) {
    return tplComment(obj);
  }
  /* 'TextNode' */
  if (obj.type === xml.TEXT_NODE) {
    return obj.text || '';
  }
  /* 'ProcessingInstruction' */
  if (obj.type === xml.PROCESSING_INSTRUCTION_NODE) {
    return tplProcessingInstruction(obj);
  }
  const content = lang.map(obj.children || [], (child) => js2xml(child)).join('');
  /* 'Document' */
  if (obj.type === xml.DOCUMENT_NODE) {
    return content;
  }
  return tplNode(lang.extend({
    stringifiedAttributes: stringifyAttributes(obj.attributes || {}),
    content,
    tag: obj.tag || '',
  }, obj));
}

module.exports = (obj, options) => {
  options = options || {};
  const result = js2xml(obj);
  if (options.beautify) {
    return xmlFormat.beautify(result, options.indent);
  }
  return xmlFormat.uglify(result, options.preserveComments);
};
