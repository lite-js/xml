'use strict'
/**
 * left-pad module
 * @module left-pad
 * @see module:index
 */
module.exports = (str, total, spacer) => {
  spacer = spacer || ' '
  let result = str.toString()
  while (result.length < total) {
    result = spacer + result
  }
  return result
}
