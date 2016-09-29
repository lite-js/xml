'use strict';
/**
 * dom module
 * @module dom
 * @see module:index
 */
const lang = require('zero-lang');

function noop() {
}

const domUtils = {
  findChildNode: (doc, query) => {
    query = query || {};
    if (!doc) {
      return null;
    }
    return domUtils.findChildNodes(doc, query)[0];
  },

  findChildNodes: (doc, query) => {
    const tagName = query.tag;
    const attrs = query.attrs || {};
    let resultNodes = [];
    if (!doc) {
      return [];
    }
    if (tagName) {
      resultNodes = lang.filter(doc.childNodes, (node) => (node.tagName === tagName));
    }
    return lang.filter(resultNodes, (node) => (
      node && lang.every(lang.keys(attrs), (key) => (node.getAttribute(key) === attrs[key]))
    ));
  },

  findOrCreateChildNode: (doc, query) => {
    // throw 'doc not defined';
    if (!doc) {
      return null;
    }
    let resultNode = domUtils.findChildNode(doc, query);
    if (!resultNode) {
      let ownerDoc = doc;
      const tagName = query.tagName;
      const attrs = query.attrs || {};
      // create with ownerDocument
      if (!doc.createElement) {
        ownerDoc = doc.ownerDocument;
      }
      resultNode = ownerDoc.createElement(tagName);
      lang.forIn(attrs, (value, key) => {
        resultNode.setAttribute(key, value);
      });
      doc.appendChild(resultNode);
    }
    return resultNode;
  },

  eachChildNode: (doc, query, callback) => {
    callback = callback || noop;
    lang.each(domUtils.findChildNodes(doc, query), (node) => {
      callback(node);
    });
  },

  removeChildNode: (doc, query) => {
    const resultNode = domUtils.findChildNode(doc, query);
    if (resultNode) {
      doc.removeChild(resultNode);
    }
    return resultNode;
  },
};

module.exports = domUtils;
