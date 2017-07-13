/* eslint-env mocha */
const {
  deepEqual
} = require('assert')
const XMLLite = require('../../indexBrowser')
const countElements = require('../support/countElements')
const leftPad = require('../support/leftPad')
const readFileSync = require('../support/readFileSync')

const files = require('../fixtures/files.json')

describe('xml2js', function testCase () {
  this.timeout(10000) // 10 seconds before timeout

  function nextFixture (fixtues) {
    if (fixtues.length) {
      const fixture = fixtues.shift()
      it(`xml2js: spec/fixtures/${fixture}.xml`, (done) => {
        const xmlContent = XMLLite.uglify(readFileSync(`./test/fixtures/${fixture}.xml`), true)
        // console.log(XMLLite.parse(xmlContent).lastChild);
        const jsonContent = require(`../fixtures/${fixture}.json`)
        const t1 = Date.now()
        const obj = XMLLite.xml2js(xmlContent)
        const time = Date.now() - t1
        const count = countElements(obj)
        console.log(
          `%cxml2js: %c%sms %cto parse %c%s %celements in fixture ${fixture}.`,
          'font-weight: bold; color: blue;',
          'font-weight: bold; color: green;',
          leftPad(time, 3),
          'font-weight: normal; color: black;',
          'font-weight: bold; color: red;',
          leftPad(count, 5),
          'font-weight: normal; color: black;'
        )
        deepEqual(
          XMLLite.xml2js(xmlContent),
          jsonContent,
          `test case by fixture ${fixture} not passed`
        )
        done()
      })
      nextFixture(fixtues)
    }
  }

  nextFixture(files)
})
