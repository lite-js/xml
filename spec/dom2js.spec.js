import XMLLite from 'xml-lite';

const assert = chai.assert;

describe('dom2js', () => {
  const testDiv = document.createElement('div');
  testDiv.innerHTML = `hello, world!
<a href="https://github.com/leungwensen/xml-lite">
  maintaining xml in pure javascript (IN BOTH NODE.JS & BROWSERS)
</a>`;
  testDiv.setAttribute('class', 'test-div');
  testDiv.setAttribute('data-hello', 'world');
  const elementObj = XMLLite.dom2js(testDiv);

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
});
