const trim = require('lodash/trim')
const map = require('lodash/map')
const repeat = require('lodash/repeat')
const filter = require('lodash/filter')

const splitOnTags = str => str.split(/(<[^<]+"\s*>)|(<\/?[^>]+>)/g).filter(line => line && trim(line) !== '')
const isTag = str => /<[^>]+>/.test(str)
const isClosingTag = str => /<\/+[^>]+>/.test(str)
const isSelfClosingTag = str => /<[^>]+\/>/.test(str)
const isComment = str => /<![ \r\n\t]*(--([^-]|[\r\n]|-[^-])*--[ \r\n\t]*)>/.test(str)
const isProcessingInstruction = str => /<\?(.*)\?>/.test(str)
const isOpeningTag = str => (
  isTag(str) && !isClosingTag(str) && !isSelfClosingTag(str) && !isComment(str) && !isProcessingInstruction(str)
)

const formatter = {
  beautify (xml, indent) {
    let depth = 0
    indent = indent || '  '

    xml = xml
      .replace(/<[^<]+"\s*>/g, matched => {
        // flatten attributes
        if (/\/>$/.test(matched)) return matched
        return filter(map(matched.split(/[\n\r]+/), part => trim(part)), str => str.length).join(' ')
      })

    xml = map(splitOnTags(xml), item => {
      if (isClosingTag(item)) depth--
      const line = repeat(indent, depth) + item
      if (isOpeningTag(item)) depth++
      return line
    }).join('\n')
    return filter(xml.split(/[\r\n]/), line => !(/^\s*$/.test(line) || trim(line) === '')).join('\n')
  },
  uglify (xml, preserveComments) {
    const str = preserveComments ? xml : xml.replace(/<![ \r\n\t]*(--([^-]|[\r\n]|-[^-])*--[ \r\n\t]*)>/g, '')
    return formatter.beautify(str).replace(/>[\s]*</g, '><') // before uglify it, you have to beautify it first
      .replace(/>[\s]*/g, '>')
      .replace(/[\s]*</g, '<')
  }
}

module.exports = formatter
