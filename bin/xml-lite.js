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
  .option('--replacer', 'replacer', null)
  .option('--space', 'space', 2)
  .action((xml, options) => {
    fs.readFile(path.resolve(process.cwd(), xml), (err, content) => {
      if (err) throw err;
      console.log(XMLLite.xml2json(content, options.replacer, options.space));
    });
  });

// json2xml
commander
  .command('json2xml [json]')
  .description('converting json to xml')
  .option('--beautify', 'beautify')
  .option('--step', 'step', 2)
  .option('--uglify', 'uglify')
  .option('--preserveComments', 'preserve comments')
  .action((json, options) => {
    fs.readFile(path.resolve(process.cwd(), json), (err, content) => {
      if (err) throw err;
      console.log(XMLLite.json2xml(content, options));
    });
  });

// execute client
commander.parse(process.argv);

if (process.argv.length === 2) commander.outputHelp();
