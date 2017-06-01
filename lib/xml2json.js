const xml2js = require('./xml2js')

module.exports = (text, replacer, space) => JSON.stringify(xml2js(text), replacer, space)
