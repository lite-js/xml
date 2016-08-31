'use strict';
/**
 * xml-format module
 * @module xml-format
 * @see module:index
 */

const lang = require('zero-lang');
const repeatString = require('./repeat-string');

const splitOnTags = str => str.split(/(<\/?[^>]+>)/g).filter(line => line.trim() !== '');
const isTag = str => /<[^>!]+>/.test(str);
const isClosingTag = str => /<\/+[^>]+>/.test(str);
const isSelfClosingTag = str => /<[^>]+\/>/.test(str);
const isOpeningTag = str => isTag(str) && !isClosingTag(str) && !isSelfClosingTag(str);

const formatter = {
  beautify(xml, indent) {
    let depth = 0;
    indent = indent || '  ';
    // flatten attributes

    xml = xml.replace(/<[^>]+>/g, (matched) => {
      if (/\/>$/.test(matched)) return matched;
      return lang.filter(lang.map(matched.split(/[\n|\r]+/), part => lang.trim(part)), str => str.length).join(' ');
    });

    return lang.map(splitOnTags(xml), item => {
      if (isClosingTag(item)) depth--;
      const line = repeatString(indent, depth) + item;
      if (isOpeningTag(item)) depth++;
      return line;
    }).join('\n');
  },
  uglify(xml, preserveComments) {
    const str = preserveComments ? xml : xml.replace(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/g, '');
    return formatter.beautify(str).replace(/>[\s]*</g, '><') // before uglify it, you should beautify it first
      .replace(/>[\s]*/g, '>')
      .replace(/[\s]*</g, '<');
  },
};

module.exports = formatter;
