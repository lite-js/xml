/* eslint-env mocha */
const {
  equal,
  deepEqual
} = require('assert')
const XMLLite = require('../../indexBrowser')

describe('dom2js', () => {
  const testDiv = document.createElement('div')
  testDiv.innerHTML = `hello, world!
<a href="https://github.com/leungwensen/xml-lite">
  maintaining xml in pure javascript (IN BOTH NODE.JS & BROWSERS)
</a>`
  testDiv.setAttribute('class', 'test-div')
  testDiv.setAttribute('data-hello', 'world')
  const elementObj = XMLLite.dom2js(testDiv)

  it('Element: type and tag', () => {
    equal(
      elementObj.type,
      testDiv.ELEMENT_NODE,
      'XMLLite.dom2js() not working: type is not right.'
    )
    equal(
      elementObj.tag,
      'DIV',
      'XMLLite.dom2js() not working: tag is not right.'
    )
  })

  it('Element: attributes', () => {
    deepEqual(
      elementObj.attributes,
      {
        class: 'test-div',
        'data-hello': 'world'
      },
      'XMLLite.dom2js() not working: something wrong with the attributes.'
    )
  })
})
