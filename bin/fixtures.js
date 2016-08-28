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

const files = [];

fs.readdir(path.resolve(__dirname, '../spec/fixtures'), (err, filenames) => {
  if (err) throw err;
  lang.each(filenames, (filename) => {
    if (!/\.xml$/.test(filename)) return;
    const basename = filename.replace(/\.xml$/, '');
    files.push(basename);
    fs.readFile(path.resolve(__dirname, `../spec/fixtures/${filename}`), 'utf8', (e, content) => {
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
