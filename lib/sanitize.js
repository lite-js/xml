const forIn = require('lodash/forIn')
const isString = require('lodash/isString')

const chars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
}
function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
}

module.exports = (str, reverse) => {
  if (!isString(str)) return str

  let result = str
  forIn(chars, (value, key) => {
    if (reverse) {
      result = result.replace(new RegExp(escapeRegExp(value), 'g'), key)
    } else {
      result = result.replace(new RegExp(escapeRegExp(key), 'g'), value)
    }
  })
  return result
}
