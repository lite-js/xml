'use strict';
/**
 * dom2js module
 * @module dom2js
 * @see module:index
 */
const domUtils = require('./dom');
const lang = require('zero-lang');

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
  const jsObj = {
    attributes: {},
    children: lang.map(filterNodes(doc.childNodes) || [], (child) => dom2js(child)),
    // NOTICE: for HTML, tagName is always UPPERCASE & for ProcessingInstruction, it is target attribute.
    tag: doc.tagName || '',
    type: NODE_TYPE[doc.nodeType],
  };

  if (jsObj.type === 'Comment') jsObj.attributes.data = doc.data;
  if (jsObj.type === 'TextNode') jsObj.text = doc.textContent;
  if (jsObj.type === 'ProcessingInstruction') {
    // FIXME some extra processing here to cover differences between browser version and node.js version
    jsObj.tag = doc.target;
    jsObj.attributes = {
      target: doc.target,
      data: doc.data,
    };
  }

  lang.each(doc.attributes || [], (attr) => {
    const name = attr.name;
    jsObj.attributes[name] = doc.getAttribute(name);
  });
  return jsObj;
}

module.exports = dom2js;
