const assert = chai.assert;
import XMLLite from 'xml-lite';

describe('dom2js', () => {
  const testXML = `<p>
  <text-content>hello, world!</text-content>
  <a href="https://github.com/leungwensen/xml-lite">
    maintaining xml in pure javascript (IN BOTH NODE.JS &amp; BROWSERS)
  </a>
</p>`;
  console.log(XMLLite.uglify(testXML, true));
  const xmlObj = XMLLite.xml2js(testXML);

  console.log(xmlObj);

  it('Element: type and tag', () => {
  });

  it('Element: attributes', () => {

  });
});
