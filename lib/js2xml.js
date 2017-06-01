const map = require('lodash/map')
const keys = require('lodash/keys')
const xml = require('./xml-lite')
const xmlFormat = require('./xml-format')

function escapeDoubleQuotes(value) {
  return value.replace(/"/g, '&quot;')
}
function escapeSingleQuotes(value) {
  return value.replace(/'/g, '&apos;')
}

function stringifyAttribute(attrs, key, keepDoubleQuotes) {
  const value = attrs[key]
  try {
    if (keepDoubleQuotes) {
      return `${key}='${escapeSingleQuotes(value)}'`
    }
    return `${key}="${escapeSingleQuotes(escapeDoubleQuotes(value))}"`
  } catch (e) {
    console.error('invalid attribute:', attrs, key)
    throw `invalid attribute: ${key}: ${JSON.stringify(value, null, '\t')}`
  }
}

function stringifyAttributes(attrs) {
  const keepDoubleQuotes = xml.keepDoubleQuotes
  const keys = keys(attrs)
  if (keys.length) {
    return ` ${map(keys, (key) => `${stringifyAttribute(attrs, key, keepDoubleQuotes)}`).join(' ')}`
  }
  return ''
}


function js2xml(obj) {
  /* 'Comment' */
  if (obj.type === xml.COMMENT_NODE) {
    return `<!--${obj.data}-->`
  }
  /* 'TextNode' */
  if (obj.type === xml.TEXT_NODE) {
    return obj.text || ''
  }
  /* 'ProcessingInstruction' */
  if (obj.type === xml.PROCESSING_INSTRUCTION_NODE) {
    return `<?${obj.tag}${obj.data ? ` ${obj.data}` : ''}?>`
  }
  const content = map(obj.children || [], (child) => js2xml(child)).join('')
  /* 'Document' */
  if (obj.type === xml.DOCUMENT_NODE) {
    return content
  }
  const stringifyAttributes = stringifyAttributes(obj.attributes || {})
  const tag = obj.tag || ''
  return `<${tag}${stringifyAttributes}>${content}</${tag}>`
}

module.exports = (obj, options) => {
  options = options || {}
  const result = js2xml(obj)
  if (options.beautify) {
    return xmlFormat.beautify(result, options.indent)
  }
  return xmlFormat.uglify(result, options.preserveComments)
}
