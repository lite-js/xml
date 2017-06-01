const map = require('lodash/map')
const xml = require('./xml-lite')

module.exports = node => {
  const children = node.childNodes
  return map(children, child => xml.serialize(child)).join('')
};
