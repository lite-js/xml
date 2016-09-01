'use strict';
/**
 * xml-format module
 * @module xml-format
 * @see module:index
 */

const lang = require('zero-lang');
const repeatString = require('./repeat-string');

const splitOnTags = str => str.split(/(<[^<]+"\s*>)|(<\/?[^>]+>)/g).filter(line => line && lang.trim(line) !== '');
const isTag = str => /<[^>]+>/.test(str);
const isClosingTag = str => /<\/+[^>]+>/.test(str);
const isSelfClosingTag = str => /<[^>]+\/>/.test(str);
const isComment = str => /<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/.test(str);
const isProcessingInstruction = str => /<\?(.*)\?>/.test(str);
const isOpeningTag = str => {
  return isTag(str) && !isClosingTag(str) && !isSelfClosingTag(str) && !isComment(str) && !isProcessingInstruction(str);
};

const formatter = {
  beautify(xml, indent) {
    let depth = 0;
    indent = indent || '  ';

    xml = xml
      .replace(/<[^<]+"\s*>/g, matched => {
        // flatten attributes
        if (/\/>$/.test(matched)) return matched;
        return lang.filter(lang.map(matched.split(/[\n|\r]+/), part => lang.trim(part)), str => str.length).join(' ');
      });
    xml = lang.map(splitOnTags(xml), item => {
      if (isClosingTag(item)) depth--;
      const line = repeatString(indent, depth) + item;
      if (isOpeningTag(item)) depth++;
      return line;
    }).join('\n');
    return lang.filter(xml.split(/[\r\n]/), line => !(/^\s*$/.test(line) || lang.trim(line) === '')).join('\n');
  },
  uglify(xml, preserveComments) {
    const str = preserveComments ? xml : xml.replace(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/g, '');
    return formatter.beautify(str).replace(/>[\s]*</g, '><') // before uglify it, you have to beautify it first
      .replace(/>[\s]*/g, '>')
      .replace(/[\s]*</g, '<');
  },
};

module.exports = formatter;
