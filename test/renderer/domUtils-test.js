/* eslint-env mocha */
const {
  deepEqual,
  doesNotThrow,
  equal
} = require('assert')
const XMLLite = require('../../indexBrowser')
const readFileSync = require('../support/readFileSync')

describe('dom-utils', () => {
  const xmlContent = readFileSync('./test/fixtures/bookstore.xml', 'utf8')
  const doc = XMLLite.parse(xmlContent)

  it('dom-utils: attributesAsObject(doc)', () => {
    deepEqual(
      XMLLite.attributesAsObject(XMLLite.findNodes(doc, {
        tagName: 'book',
        attributes: {
          category: 'COOKING'
        }
      })[0]),
      {
        category: 'COOKING'
      },
      'XMLLite.attributesAsObject(doc) not working: something wrong.'
    )
  })

  it('dom-utils: findChildNode(doc, query)', () => {
    equal(
      XMLLite.findChildNode(doc, {
        nodeName: 'PITarget'
      }).nodeName,
      'PITarget',
      'XMLLite.findChildNode(doc, query) not working: not exists.'
    )
  })

  it('dom-utils: findChildNodes(doc, query)', () => {
    equal(
      XMLLite.findChildNodes(XMLLite.findChildNode(doc, {
        tagName: 'bookstore'
      }), {
        tagName: 'book'
      }).length,
      3,
      'XMLLite.findChildNodes(doc, query) not working: result nodes count not matching.'
    )
  })

  it('dom-utils: findAllNodes(doc, query)', () => {
    equal(
      XMLLite.findAllNodes(XMLLite.findChildNode(doc, {
        tagName: 'bookstore'
      }), {
        tagName: 'price'
      }).length,
      3,
      'XMLLite.findAllNodes(doc, query) not working: result nodes count not matching.'
    )
  })

  // #16
  it('dom-utils: findChildNodes(doc, query) on an element that has no childNodes', () => {
    equal(
      XMLLite.findChildNodes(doc.childNodes[0], {
        tagName: 'book'
      }).length,
      0,
      'XMLLite.findChildNodes(doc, query) not working: result nodes count not matching.'
    )
  })

  it('dom-utils: createChildNode(doc, query)', () => {
    equal(
      // cannot call this on #document, because Only one element on document allowed.
      XMLLite.createChildNode(doc.documentElement, {
        tagName: 'test'
      }).tagName,
      'test',
      'XMLLite.createChildNode(doc, query) not working: failed.'
    )
  })

  it('dom-utils: findOrCreateChildNode(doc, query)', () => {
    equal(
      // cannot call this on #document, because Only one element on document allowed.
      XMLLite.findOrCreateChildNode(doc.documentElement, {
        tagName: 'test'
      }).tagName,
      'test',
      'XMLLite.findOrCreateChildNode(doc, query) not working: failed.'
    )
  })

  it('dom-utils: eachChildNode(doc, query, callback)', () => {
    doesNotThrow(
      () => {
        XMLLite.eachChildNode(doc, {}, (node) => {
          console.log(node.nodeName)
        })
      },
      Error,
      'XMLLite.eachChildNode(doc, query, callback) not working: failed.'
    )
  })

  it('dom-utils: eachNode(doc, query, callback)', () => {
    doesNotThrow(
      () => {
        XMLLite.eachNode(doc, {}, (node) => {
          console.log(node.nodeName)
        })
      },
      Error,
      'XMLLite.eachChildNode(doc, query, callback) not working: failed.'
    )
  })

  it('dom-utils: removeChildNode(doc, query)', () => {
    const length = doc.childNodes.length
    console.log(doc.childNodes)

    doesNotThrow(
      () => {
        XMLLite.removeChildNode(doc, {
          nodeName: 'PITarget'
        })
      },
      Error,
      'XMLLite.eachChildNode(doc, query, callback) not working: failed.'
    )

    equal(
      doc.childNodes.length,
      length - 1,
      'XMLLite.removeChildNode(doc, query) not working: failed.'
    )

    console.log(doc.childNodes)
  })
})
