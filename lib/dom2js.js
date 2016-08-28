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

function dom2js(doc) {
  //console.log(doc, doc.children, doc.childNodes);
  const jsObj = {
    attributes: {},
    children: lang.map(doc.childNodes, (child) => dom2js(child)),
    tag: doc.tagName || '', // NOTICE: for HTML, tagName is always UPPERCASE
    type: NODE_TYPE[doc.nodeType],
  };
  if (jsObj.type === 'TextNode') jsObj.text = doc.textContent;
  lang.each(doc.attributes || [], (attr) => {
    const name = attr.name;
    jsObj.attributes[name] = doc.getAttribute(name);
  });
  return jsObj;
}

module.exports = dom2js;
