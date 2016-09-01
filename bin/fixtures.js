#!/usr/bin/env node
'use strict';
/**
 * fixtures-xml2js module
 * @module fixtures-xml2js
 * @see module:index
 */
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const XMLLite = require('../lib/index');

function fixingAndBeautifying(content) {
  // console.log(match, p1, p2);
  return XMLLite.beautify(content.replace(/<([^\s<>]+)([^>]*)\/>/g, (match, p1, p2) => `<${p1}${p2}></${p1}>`));
}

const files = [];

fs.readdir(path.resolve(__dirname, '../spec/fixtures'), (err, filenames) => {
  if (err) throw err;
  lang.each(filenames, (filename) => {
    if (!/\.xml$/.test(filename)) return;
    const basename = filename.replace(/\.xml$/, '');
    files.push(basename);
    fs.readFile(path.resolve(__dirname, `../spec/fixtures/${filename}`), 'utf8', (e, content) => {
      content = fixingAndBeautifying(content);
      fs.writeFile(
        path.resolve(__dirname, `../spec/fixtures/${basename}.xml`),
        content, (writeErr1) => {
          if (writeErr1) console.error(writeErr1);
        }
      );
      if (e) {
        console.error(e);
      } else {
        fs.writeFile(
          path.resolve(__dirname, `../spec/fixtures/${basename}.json`),
          XMLLite.xml2json(content, null, 2), (writeErr) => {
            if (writeErr) console.error(writeErr);
          }
        );
      }
    });
  });
  fs.writeFile(path.resolve(__dirname, '../spec/fixtures/files.json'), JSON.stringify(files), (error) => {
    if (error) console.error(error);
  });
});
