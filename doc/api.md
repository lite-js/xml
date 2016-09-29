API
===

## Properties

supported | name | description 
----------|-----|------------
yes | domParser     | instance of DOMParser
yes | xmlSerializer | instance of XMLSerializer

## Methods

### Parsing/Serializing

supported | name | alias | parameters | return value | description
----------|------|-------|------------|--------------|------------
yes | parse     | parseFromString   | String str   | Document doc | parsing a xml string
yes | serialize | serializeToString | Document doc | String str   | Document to xml string

### DOM maintaining

supported | name | alias | parameters | return value | description
----------|------|-------|------------|--------------|------------
yes | findChildNode         |  | Node doc, Object query                    | Node child  | find one child node
yes | findChildNodes        |  | Node doc, Object query                    | Array(Node) | find child nodes
yes | findOrCreateChildNode |  | Node doc, Object query                    | Node child  | find or create one child node
yes | removeChildNode       |  | Node doc, Object query                    | Node child  | remove one child node
yes | eachChildNode         |  | Node doc, Object query, Function callback | null        | execute callback using child node as parameter

#### Sample for `Object query` 

```javascript
// query for <some-tag key="value"/>
{
  tag: 'some-tag', // Node.tagName === 'some-tag'
  attrs: {         // Node.getAttribute('key') === 'value'
    key: 'value'
  }
}
```

### Formatting

supported | name | alias | parameters | return value | description
----------|------|-------|------------|--------------|------------
yes | beautify |  | String xml, (String or Number) step  | String str | beautify xml string 
yes | uglify   |  | String xml, Boolean preserveComments | String str | uglify xml string
yes | sanitize |  | String xml, Boolean reverse          | String str | escape or unescape "&", "<" and ">"

### Converting

supported | name | alias | parameters | return value | description
----------|------|-------|------------|--------------|------------
yes | dom2js   |  | Node node                                 | Object obj   | converting a Node instance into js object
yes | xml2js   |  | String xml                                | Object obj   | converting an xml string into js object
yes | xml2json |  | String xml, String replacer, String space | String json  | converting an xml string into json string
yes | js2xml   |  | Object obj, Object options                | String xml   | converting an object into xml string
yes | json2xml |  | String json, Object options               | String xml   | converting a json string into xml string
yes | js2dom   |  | Object obj                                | Node doc     | converting an object into a Node instance
yes | json2dom |  | String json                               | Node doc     | converting a json string into a Node instance

