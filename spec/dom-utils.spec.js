import XMLLite from 'xml-lite';

const assert = chai.assert;

describe('dom-utils', () => {
  $.get('./fixtures/bookstore.xml', (xmlContent) => {
    const doc = XMLLite.parse(xmlContent);

    it('dom-utils: findChildNode(doc, query)', () => {
      assert.equal(
        XMLLite.findChildNode(doc, {
          nodeName: 'PITarget'
        }).nodeName,
        'PITarget',
        'XMLLite.findChildNode(doc, query) not working: not exists.'
      );
    });

    it('dom-utils: findChildNodes(doc, query)', () => {
      assert.equal(
        XMLLite.findChildNodes(XMLLite.findChildNode(doc, {
          tagName: 'bookstore'
        }), {
          tagName: 'book'
        }).length,
        3,
        'XMLLite.findChildNodes(doc, query) not working: result nodes count not matching.'
      );
    });

    it('dom-utils: findAllNodes(doc, query)', () => {
      assert.equal(
        XMLLite.findAllNodes(XMLLite.findChildNode(doc, {
          tagName: 'bookstore'
        }), {
          tagName: 'price'
        }).length,
        3,
        'XMLLite.findAllNodes(doc, query) not working: result nodes count not matching.'
      );
    });

    it('dom-utils: createChildNode(doc, query)', () => {
      assert.equal(
        // cannot call this on #document, because Only one element on document allowed.
        XMLLite.createChildNode(doc.documentElement, {
          tagName: 'test'
        }).tagName,
        'test',
        'XMLLite.createChildNode(doc, query) not working: failed.'
      );
    });

    it('dom-utils: findOrCreateChildNode(doc, query)', () => {
      assert.equal(
        // cannot call this on #document, because Only one element on document allowed.
        XMLLite.findOrCreateChildNode(doc.documentElement, {
          tagName: 'test'
        }).tagName,
        'test',
        'XMLLite.findOrCreateChildNode(doc, query) not working: failed.'
      );
    });

    it('dom-utils: eachChildNode(doc, query, callback)', () => {
      assert.doesNotThrow(
        () => {
          XMLLite.eachChildNode(doc, {}, (node) => {
            console.log(node.nodeName);
          });
        },
        Error,
        'XMLLite.eachChildNode(doc, query, callback) not working: failed.'
      );
    });

    it('dom-utils: eachNode(doc, query, callback)', () => {
      assert.doesNotThrow(
        () => {
          XMLLite.eachNode(doc, {}, (node) => {
            console.log(node.nodeName);
          });
        },
        Error,
        'XMLLite.eachChildNode(doc, query, callback) not working: failed.'
      );
    });

    it('dom-utils: removeChildNode(doc, query)', () => {
      const length = doc.childNodes.length;
      console.log(doc.childNodes);

      assert.doesNotThrow(
        () => {
          XMLLite.removeChildNode(doc, {
            nodeName: 'PITarget'
          });
        },
        Error,
        'XMLLite.eachChildNode(doc, query, callback) not working: failed.'
      );

      assert.equal(
        doc.childNodes.length,
        length - 1,
        'XMLLite.removeChildNode(doc, query) not working: failed.'
      );

      console.log(doc.childNodes);
    });
  }, 'text');
});
