/* eslint-env mocha */
const {
  equal
} = require('assert')
const countElements = require('../support/countElements')
const leftPad = require('../support/leftPad')
const XMLLite = require('../../indexBrowser')
const readFileSync = require('../support/readFileSync')

const files = require('../fixtures/files.json')

describe('js2xml', function testCase () {
  this.timeout(10000) // 10 seconds before timeout

  function nextFixture (fixtues) {
    if (fixtues.length) {
      const fixture = fixtues.shift()
      it(`js2xml: spec/fixtures/${fixture}.xml`, (done) => {
        const xmlContent = readFileSync(`./test/fixtures/${fixture}.xml`)
        const jsonContent = require(`../fixtures/${fixture}.json`)
        const t1 = Date.now()
        XMLLite.js2xml(jsonContent)
        const time = Date.now() - t1
        const count = countElements(jsonContent)
        console.log(
          `%cjs2xml: %c%sms %cto render %c%s %celements in fixture ${fixture}.`,
          'font-weight: bold; color: blue;',
          'font-weight: bold; color: green;',
          leftPad(time, 3),
          'font-weight: normal; color: black;',
          'font-weight: bold; color: red;',
          leftPad(count, 4),
          'font-weight: normal; color: black;'
        )

        if (fixture !== 'mmap-content') {
          equal(
            XMLLite.js2xml(jsonContent),
            XMLLite.uglify(xmlContent),
            `test case by fixture ${fixture} not passed`
          )
        }
        done()
      })
      nextFixture(fixtues)
    }
  }

  nextFixture(files)
})
