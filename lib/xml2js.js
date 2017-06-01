const xml = require('./xml-lite')
const dom2js = require('./dom2js')

module.exports = (text) => dom2js(xml.parse(text))
