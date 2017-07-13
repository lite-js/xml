const xml = require('./xml')
const dom2js = require('./dom2js')

module.exports = (text) => dom2js(xml.parse(text))
