'use strict'
/**
 * index.demo module
 * @module index.demo
 * @see module:index
 */
import $ from 'jquery'
import CodeMirror from 'codemirror'
import XMLLite from '@lite-js/xml'
import assignIn from 'lodash/assignIn'
import './index.less'

const $xml = $('#xml-textarea')
const $json = $('#json-textarea')
const $parserStatus = $('#parser-status')

XMLLite.keepDoubleQuotes = true

const editorOptions = {
  foldGutter: true,
  gutters: [
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter'
  ],
  lineNumbers: true,
  lineWrapping: true
}

const xmlEditor = CodeMirror.fromTextArea($xml[0], assignIn({
  mode: 'text/xml'
}, editorOptions))
const jsonEditor = CodeMirror.fromTextArea($json[0], assignIn({
  mode: 'javascript'
}, editorOptions))

function setParserStatus (error) {
  if (error) {
    $parserStatus
      .removeClass('success')
      .addClass('error')
      .html(error)
  } else {
    $parserStatus
      .removeClass('error')
      .addClass('success')
      .html('success')
  }
}

function xml2json () {
  const xmlContent = xmlEditor.getValue()
  try {
    const json = XMLLite.xml2json(xmlContent, null, 2)
    jsonEditor.getDoc().setValue(json)
    setParserStatus()
  } catch (e) {
    console.log(e)
    setParserStatus(e)
  }
}
function json2xml () {
  const jsonContent = jsonEditor.getValue()
  try {
    const xml = XMLLite.json2xml(jsonContent, {
      beautify: true
    })
    xmlEditor.getDoc().setValue(xml)
    setParserStatus()
  } catch (e) {
    console.log(e)
    setParserStatus(e)
  }
}

xmlEditor.on('change', () => {
  if (xmlEditor.hasFocus()) {
    xml2json()
  }
})
jsonEditor.on('change', () => {
  if (jsonEditor.hasFocus()) {
    json2xml()
  }
})

$.get('./test/fixtures/bookstore.xml', (xmlContent) => {
  xmlEditor.getDoc().setValue(xmlContent)
  xml2json()
}, 'text')
