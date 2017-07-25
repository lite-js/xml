const map = require('lodash/map')
const keys = require('lodash/keys')
const xml = require('./xml')
const xmlFormat = require('./xmlFormat')

function escapeDoubleQuotes (value) {
  return value.replace(/"/g, '&quot;')
}
function escapeSingleQuotes (value) {
  return value.replace(/'/g, '&apos;')
}

function stringifyAttribute (attrs, key, keepDoubleQuotes) {
  const value = attrs[key]
  if (typeof value !== 'string') {
    console.error('invalid attribute type:', attrs, key)
    return `${key}=''`
  }
  try {
    if (keepDoubleQuotes) {
      return `${key}='${escapeSingleQuotes(value)}'`
    }
    return `${key}="${escapeSingleQuotes(escapeDoubleQuotes(value))}"`
  } catch (e) {
    console.error('invalid attribute:', attrs, key)
    throw new TypeError(`invalid attribute: ${key}: ${JSON.stringify(value, null, '\t')}`)
  }
}

function stringifyAttributes (attrs) {
  const keepDoubleQuotes = xml.keepDoubleQuotes
  const attrKeys = keys(attrs)
  if (attrKeys.length) {
    return ` ${map(attrKeys, (key) => `${stringifyAttribute(attrs, key, keepDoubleQuotes)}`).join(' ')}`
  }
  return ''
}

function js2xml (obj) {
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
  const stringifyAttrs = stringifyAttributes(obj.attributes || {})
  const tag = obj.tag || ''
  return `<${tag}${stringifyAttrs}>${content}</${tag}>`
}

module.exports = (obj, options) => {
  options = options || {}
  const result = js2xml(obj)
  if (options.beautify) {
    return xmlFormat.beautify(result, options.indent)
  }
  return xmlFormat.uglify(result, options.preserveComments)
}
