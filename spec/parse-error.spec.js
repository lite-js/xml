import XMLLite from 'xml-lite';

const assert = chai.assert;

describe('error tracking', () => {
  it('XMLLite.parse(): invalid xml', () => {
    assert.throws(
      () => {
        XMLLite.parse('some text');
      },
      'invalid XML'
    );
    assert.throws(
      () => {
        XMLLite.parse('<xx');
      },
      'invalid XML'
    );
    assert.throws(
      () => {
        XMLLite.parse('<test/><!--');
      },
      'invalid XML'
    );
  });
  it('XMLLite.parse(): empty document', () => {
    assert.throws(
      () => {
        XMLLite.parse('');
      },
      'invalid XML'
    );
  });
  it('XMLLite.parse(): unclosed tag', () => {
    assert.throws(
      () => {
        XMLLite.parse('<img>');
      },
      'invalid XML'
    );
  });
  it('XMLLite.parse(): attribute missing qute', () => {
    assert.throws(
      () => {
        XMLLite.parse('<img src=1/>');
      },
      'invalid XML'
    );
  });
  it('XMLLite.parse(): invalid attribute', () => {
    assert.throws(
      () => {
        XMLLite.parse('<img src="<>&"/>');
      },
      'invalid XML'
    );
  });
});
