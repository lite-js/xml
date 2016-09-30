'use strict';
/**
 * dom module
 * @module dom
 * @see module:index
 */
const lang = require('zero-lang');
const NODE_TYPE = require('./node-type');

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
    const FILTER_QUERY_PROPS = [
      'localName',
      'namespaceURI',
      'nodeName',
      'nodeType',
      'tagName',
    ];
    let resultNodes = doc.childNodes;
    if (!doc) {
      return [];
    }
    lang.each(FILTER_QUERY_PROPS, (prop) => {
      if (query[prop]) {
        resultNodes = lang.filter(doc.childNodes, (node) => (node[prop] === query[prop]));
      }
    });
    const attrs = query.attributes || {};
    return lang.filter(resultNodes, (node) => (
      node && lang.every(lang.keys(attrs), (key) => (node.getAttribute(key) === attrs[key]))
    ));
  },

  createChildNode: (doc, query) => {
    // FIXME: support more NodeTypes
    if (!doc) {
      return null;
    }
    let ownerDoc = doc;
    const tagName = query.tagName || 'child';
    const attrs = query.attributes || {};
    // create with ownerDocument
    if (!doc.createElement) {
      ownerDoc = doc.ownerDocument;
    }
    const resultNode = ownerDoc.createElement(tagName);
    lang.forIn(attrs, (value, key) => {
      resultNode.setAttribute(key, value);
    });
    if (NODE_TYPE[doc.nodeType] === 'Document' && doc.childNodes.length > 1) {
    }
    doc.appendChild(resultNode);
    return resultNode;
  },

  findOrCreateChildNode: (doc, query) => {
    if (!doc) {
      return null;
    }
    let resultNode = domUtils.findChildNode(doc, query);
    if (!resultNode) {
      resultNode = domUtils.createChildNode(doc, query);
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
