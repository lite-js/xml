Roadmap
=======

## 0.1.0 (Basic usable version)

### Parsing/Serializing

- [x] XMLLite.parse(xml)
- [x] XMLLite.serialize(DOM)

## 0.2.0 ~ 0.9.0 (Features added)

### DOM maintaining

- [x] XMLLite.findChildNode(doc, query)
- [x] XMLLite.findChildNodes(doc, query)
- [x] XMLLite.findOrCreateChildNode(doc, query)
- [x] XMLLite.removeChildNode(doc, query)
- [x] XMLLite.eachChildNode(doc, query, callback)

### Formatting

- [x] XMLLite.beautify(xml, indent)
- [x] XMLLite.uglify(xml, preserveComments)
- [x] XMLLite.sanitize(xml, reverse)

### Converting

- [x] XMLLite.dom2js(DOM)
- [x] XMLLite.xml2js(xml)
- [x] XMLLite.xml2json(xml, replacer, space)
- [x] XMLLite.js2xml(obj, options)
- [x] XMLLite.json2xml(json, options)
- [x] XMLLite.js2dom(obj)
- [x] XMLLite.json2dom(json)

## 1.0.0 (Works as expected)

- [ ] Works exactly the same in both Node.js and browsers
- [ ] Error tracking
- [ ] Optimizing

## 2.0.0 (Better structure and APIs)
