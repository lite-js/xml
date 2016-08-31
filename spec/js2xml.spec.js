import $ from 'jquery';
import XMLLite from 'xml-lite';
import countElements from './count-elements';
import leftPad from './left-pad';

const assert = chai.assert;

describe('js2xml', function description() {
  this.timeout(10000); // 10 seconds before timeout

  function nextFixture(fixtues) {
    if (fixtues.length) {
      const fixture = fixtues.shift();
      it(`js2xml: spec/fixtures/${fixture}.xml`, (done) => {
        $.get(`./fixtures/${fixture}.xml`,
          (xmlContent) => {
            $.get(`./fixtures/${fixture}.json`, (jsonContent) => {
              const t1 = Date.now();
              XMLLite.js2xml(jsonContent);
              const time = Date.now() - t1;
              const count = countElements(jsonContent);
              console.log(
                `%cjs2xml: %c%sms %cto render %c%s %celements in fixture ${fixture}.`,
                'font-weight: bold; color: blue;',
                'font-weight: bold; color: green;',
                leftPad(time, 3),
                'font-weight: normal; color: black;',
                'font-weight: bold; color: red;',
                leftPad(count, 4),
                'font-weight: normal; color: black;'
              );
              if (fixture === 'mmap-content') {
                console.log(XMLLite.js2xml(jsonContent), XMLLite.uglify(xmlContent));
              } else {
                assert.equal(
                  XMLLite.js2xml(jsonContent),
                  XMLLite.uglify(xmlContent),
                  `test case by fixture ${fixture} not passed`
                );
              }
              done();
            });
          },
          'text'
        );
      });
      nextFixture(fixtues);
    }
  }

  $.get('./fixtures/files.json', (files) => {
    nextFixture(files);
  });
});
