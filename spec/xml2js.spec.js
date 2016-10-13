import $ from 'jquery';
import XMLLite from 'xml-lite';
import countElements from './count-elements';
import leftPad from './left-pad';

const assert = chai.assert;

describe('xml2js', function description() {
  this.timeout(10000); // 10 seconds before timeout

  function nextFixture(fixtues) {
    if (fixtues.length) {
      const fixture = fixtues.shift();
      it(`xml2js: spec/fixtures/${fixture}.xml`, (done) => {
        $.get(`./fixtures/${fixture}.xml`, (xmlContent) => {
          // console.log(XMLLite.parse(xmlContent).lastChild);
          $.get(`./fixtures/${fixture}.json`, (jsonContent) => {
            const t1 = Date.now();
            const obj = XMLLite.xml2js(xmlContent);
            const time = Date.now() - t1;
            const count = countElements(obj);
            console.log(
              `%cxml2js: %c%sms %cto parse %c%s %celements in fixture ${fixture}.`,
              'font-weight: bold; color: blue;',
              'font-weight: bold; color: green;',
              leftPad(time, 3),
              'font-weight: normal; color: black;',
              'font-weight: bold; color: red;',
              leftPad(count, 5),
              'font-weight: normal; color: black;'
            );
            assert.deepEqual(
              XMLLite.xml2js(xmlContent),
              jsonContent,
              `test case by fixture ${fixture} not passed`
            );
            done();
          });
        }, 'text');
      });
      nextFixture(fixtues);
    }
  }

  $.get('./fixtures/files.json', (files) => {
    nextFixture(files);
  });
});
