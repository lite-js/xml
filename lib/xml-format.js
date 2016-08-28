'use strict';
/**
 * xml-format module
 * @module xml-format
 * @see module:index
 * @see https://github.com/vkiryukhin/pretty-data/blob/master/pretty-data.js
 */

function createShiftArr(step) {
  let space = '  ';
  if (isNaN(parseInt(step, 10))) {  // argument is string
    space = step;
  } else { // argument is integer
    space = new Array(step + 1).join(' '); // space is result of join (a string), not an array
  }
  const shift = ['\n']; // array of shifts
  for (let ix = 0; ix < 100; ix++) {
    shift.push(shift[ix] + space);
  }
  return shift;
}

module.exports = {
  beautify(xml, step) {
    const shift = createShiftArr(step);
    const ar = xml.replace(/>[\s|\r|\n]*</g, '><')
      .replace(/</g, '~::~<')
      .replace(/\s*xmlns:/g, '~::~xmlns:')
      .replace(/\s*xmlns=/g, '~::~xmlns=')
      .split('~::~');
    const len = ar.length;
    let deep = 0;
    let inComment = false;
    let str = '';

    for (let ix = 0; ix < len; ix++) {
      // start comment or <![CDATA[...]]> or <!DOCTYPE //
      if (ar[ix].search(/<!/) > -1) {
        str += shift[deep] + ar[ix];
        inComment = true;
        // end comment  or <![CDATA[...]]> //
        if (ar[ix].search(/-->/) > -1 || ar[ix].search(/]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1) inComment = false;
      } else if (ar[ix].search(/-->/) > -1 || ar[ix].search(/]>/) > -1) {
        // end comment  or <![CDATA[...]]> //
        str += ar[ix];
        inComment = false;
      } else if (/^<\w/.exec(ar[ix - 1]) && /^<\/\w/.exec(ar[ix]) &&
        /^<[\w:\-\.,]+/.exec(ar[ix - 1]) === /^<\/[\w:\-\.,]+/.exec(ar[ix])[0].replace('/', '')) {
        // <elm></elm> //
        str += ar[ix];
        if (!inComment) deep--;
      } else if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) === -1 && ar[ix].search(/\/>/) === -1) {
        // <elm> //
        str = !inComment ? str += shift[deep++] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
        // <elm>...</elm> //
        str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/<\//) > -1) {
        // </elm> //
        str = !inComment ? str += shift[--deep] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/\/>/) > -1) {
        // <elm/> //
        str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/<\?/) > -1) {
        // <? xml ... ?> //
        str += shift[deep] + ar[ix];
      } else if (ar[ix].search(/xmlns:/) > -1 || ar[ix].search(/xmlns=/) > -1) {
        // xmlns //
        str += shift[deep] + ar[ix];
      } else {
        str += ar[ix];
      }
    }
    return (str[0] === '\n') ? str.slice(1) : str;
  },
  uglify(xml, preserveComments) {
    const str = preserveComments ? xml : xml.replace(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/g, '');
    return str.replace(/>[\s|\r|\n]*</g, '><')
      .replace(/>[\s|\r|\n]*/g, '>')
      .replace(/[\s|\r|\n]*</g, '<');
  },
};
