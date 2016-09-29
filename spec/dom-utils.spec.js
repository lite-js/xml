import XMLLite from 'xml-lite';

const assert = chai.assert;

describe('dom2js', () => {
  $.get(`./fixtures/bookstore.xml`, (xmlContent) => {
    const doc = XMLLite.parse(xmlContent);
    console.log(xmlContent, doc.childNodes);
    /*
    it('Element: type and tag', () => {
      assert.equal(
        elementObj.type,
        'Element',
        'XMLLite.dom2js() not working: type is not right.'
      );
      assert.equal(
        elementObj.tag,
        'DIV',
        'XMLLite.dom2js() not working: tag is not right.'
      );
    });

    it('Element: attributes', () => {
      assert.deepEqual(
        elementObj.attributes,
        {
          class: 'test-div',
          'data-hello': 'world',
        },
        'XMLLite.dom2js() not working: something wrong with the attributes.'
      );
    });
    */
  }, 'text');
});
