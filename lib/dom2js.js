const filter = require('lodash/filter')
const map = require('lodash/map')
const each = require('lodash/each')
const sanitize = require('./sanitize')

function unescapeQuotes (value) {
  return value
    .replace(/&quot/g, '"')
    .replace(/&apos/g, "'")
}

function filterNodes (nodes) {
  // FIXME the browser version does not deal with ProcessingInstruction of <?xml version="1.0" encoding="UTF-8"?>
  nodes = nodes || []
  return filter(nodes, (node) => !(node.nodeType === 7 && node.target === 'xml'))
}

function dom2js (doc) {
  const obj = {
    // NOTICE: for HTML, tagName is always UPPERCASE.
    type: doc.nodeType
  }

  // special types
  if (obj.type === 8) {
    /* doc.COMMENT_NODE */
    obj.data = doc.data
  }
  if (obj.type === 3) {
    /* doc.TEXT_NODE */
    obj.text = sanitize(doc.textContent)
  }
  if (obj.type === 7) {
    /* doc.PROCESSING_INSTRUCTION_NODE */
    obj.tag = doc.target // FIXME in browser version, it has tagName
    obj.data = doc.data
  }

  // extra properties
  if (doc.tagName) obj.tag = doc.tagName
  if (doc.childNodes && doc.childNodes.length) {
    obj.children = map(filterNodes(doc.childNodes), (child) => dom2js(child))
  }
  if (doc.attributes) {
    obj.attributes = {}
    each(doc.attributes || [], (attr) => {
      const name = attr.name
      obj.attributes[name] = unescapeQuotes(doc.getAttribute(name))
    })
  }
  return obj
}

module.exports = dom2js
