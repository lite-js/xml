/* eslint-env mocha */
const {
  throws
} = require('assert')
const XMLLite = require('../../indexBrowser')

describe('error tracking', () => {
  it('XMLLite.parse(): invalid xml', () => {
    throws(
      () => {
        XMLLite.parse('some text')
      },
      'invalid XML'
    )
    throws(
      () => {
        XMLLite.parse('<xx')
      },
      'invalid XML'
    )
    throws(
      () => {
        XMLLite.parse('<test/><!--')
      },
      'invalid XML'
    )
  })
  it('XMLLite.parse(): empty document', () => {
    throws(
      () => {
        XMLLite.parse('')
      },
      'invalid XML'
    )
  })
  it('XMLLite.parse(): unclosed tag', () => {
    throws(
      () => {
        XMLLite.parse('<img>')
      },
      'invalid XML'
    )
  })
  it('XMLLite.parse(): attribute missing qute', () => {
    throws(
      () => {
        XMLLite.parse('<img src=1/>')
      },
      'invalid XML'
    )
  })
  it('XMLLite.parse(): invalid attribute', () => {
    throws(
      () => {
        XMLLite.parse('<img src="<>&"/>')
      },
      'invalid XML'
    )
  })
})
