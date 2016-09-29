'use strict';
/**
 * dom2js module
 * @module dom2js
 * @see module:index
 */
const lang = require('zero-lang');
const sanitize = require('./sanitize');

const NODE_TYPE = {
  1: 'Element',               // Node.ELEMENT_NODE
  3: 'TextNode',              // Node.TEXT_NODE
  7: 'ProcessingInstruction', // Node.PROCESSING_INSTRUCTION_NODE
  8: 'Comment',               // Node.COMMENT_NODE
  9: 'Document',              // Node.DOCUMENT_NODE
  10: 'DocumentType',         // Node.DOCUMENT_TYPE_NODE
  11: 'DocumentFragment',     // Node.DOCUMENT_FRAGMENT_NODE
};

function filterNodes(nodes) {
  // FIXME the browser version does not deal with ProcessingInstruction of <?xml version="1.0" encoding="UTF-8"?>
  nodes = nodes || [];
  return lang.filter(nodes, (node) => !(node.nodeType === 7 && node.target === 'xml'));
}

function dom2js(doc) {
  const obj = {
    // NOTICE: for HTML, tagName is always UPPERCASE.
    type: NODE_TYPE[doc.nodeType],
  };

  // special types
  if (obj.type === 'Comment') obj.data = doc.data;
  if (obj.type === 'TextNode') obj.text = sanitize(doc.textContent);
  if (obj.type === 'ProcessingInstruction') {
    obj.tag = doc.target; // FIXME in browser version, it has tagName
    obj.data = doc.data;
  }

  // extra properties
  if (doc.tagName) obj.tag = doc.tagName;
  if (doc.childNodes && doc.childNodes.length) {
    obj.children = lang.map(filterNodes(doc.childNodes), (child) => dom2js(child));
  }
  if (doc.attributes) {
    obj.attributes = {};
    lang.each(doc.attributes || [], (attr) => {
      const name = attr.name;
      obj.attributes[name] = doc.getAttribute(name);
    });
  }
  return obj;
}

module.exports = dom2js;
