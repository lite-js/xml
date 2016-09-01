#!/usr/bin/env node
'use strict';
/**
 * json2xml module
 * @module json2xml
 * @see module:index
 */
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const XMLLite = require('../lib/index');

// xml2json
commander
  .command('xml2json [xml]')
  .description('converting xml to json')
  .option('--replacer [replacer]', 'replacer')
  .option('--space [space]', 'space')
  .action((xml, options) => {
    fs.readFile(path.resolve(process.cwd(), xml), 'utf8', (err, content) => {
      if (err) throw err;
      console.log(XMLLite.xml2json(content, options.replacer, options.space));
    });
  });

// json2xml
commander
  .command('json2xml [json]')
  .description('converting json to xml')
  .option('--beautify', 'beautify')
  .option('--indent [indent]', 'indent', '  ')
  .option('--uglify', 'uglify')
  .option('--preserveComments', 'preserve comments')
  .action((json, options) => {
    fs.readFile(path.resolve(process.cwd(), json), 'utf8', (err, content) => {
      if (err) throw err;
      console.log(XMLLite.json2xml(content, options));
    });
  });

// beautify
commander
  .command('beautify [xml]')
  .description('beautifying an xml file')
  .option('--indent [indent]', 'indent', '  ')
  .action((xml, options) => {
    fs.readFile(path.resolve(process.cwd(), xml), 'utf8', (err, content) => {
      if (err) throw err;
      console.log(XMLLite.beautify(content, options.indent));
      //XMLLite.beautify(content, options.indent);
    });
  });

// uglify
commander
  .command('uglify [xml]')
  .description('uglifying an xml file')
  .option('--preserveComments', 'preserve comments')
  .action((xml, options) => {
    fs.readFile(path.resolve(process.cwd(), xml), 'utf8', (err, content) => {
      if (err) throw err;
      console.log(XMLLite.uglify(content, options.preserveComments));
    });
  });

// execute client
commander.parse(process.argv);

if (process.argv.length === 2) commander.outputHelp();
