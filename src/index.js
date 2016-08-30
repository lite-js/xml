'use strict';
/**
 * index.demo module
 * @module index.demo
 * @see module:index
 */
import './index.less';
import $ from 'jquery';
import CodeMirror from 'codemirror';
import XMLLite from 'xml-lite';
import lang from 'zero-lang';

const $xml = $('#xml-textarea');
const $json = $('#json-textarea');

const editorOptions = {
  foldGutter: true,
  gutters: [
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter'
  ],
  lineNumbers: true,
  lineWrapping: true,
};

const xmlEditor = CodeMirror.fromTextArea($xml[0], lang.extend({
  mode: 'text/xml',
}, editorOptions));
const jsonEditor = CodeMirror.fromTextArea($json[0], lang.extend({
  mode: 'javascript',
}, editorOptions));

function xml2json() {
  const xmlContent = xmlEditor.getValue();
  try {
    const json = XMLLite.xml2json(xmlContent, null, 2);
    jsonEditor.getDoc().setValue(json);
  } catch (e) {
  }
}
function json2xml() {
  const jsonContent = jsonEditor.getValue();
  try {
    const xml = XMLLite.json2xml(jsonContent, {
      beautify: true,
    });
    xmlEditor.getDoc().setValue(xml);
  } catch (e) {
  }
}

xmlEditor.on('change', () => {
  if (xmlEditor.hasFocus()) {
    xml2json();
  }
});
jsonEditor.on('change', () => {
  if (jsonEditor.hasFocus()) {
    json2xml();
  }
});

$.get('../spec/fixtures/bookstore.xml', (xmlContent) => {
  xmlEditor.getDoc().setValue(xmlContent);
  xml2json();
}, 'text');
