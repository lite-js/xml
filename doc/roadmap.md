Roadmap
=======

## 0.1.0 (Basic usable version)

### Parsing/Serializing

- [ ] XMLLite.parse(xml)
- [ ] XMLLite.serialize(DOM)

## 0.2.0 ~ 0.9.0 (Features added)

### DOM maintaining

- [ ] XMLLite.findChildNode(doc, tagName, attrs)
- [ ] XMLLite.findChildNodes(doc, tagName, attrs)
- [ ] XMLLite.findOrCreateChildNode(doc, tagName, attrs)
- [ ] XMLLite.removeChildNode(doc, tagName, attrs)
- [ ] XMLLite.eachChildNode(doc, tagName, attrs, callback)

### Formatting

- [ ] XMLLite.beautify(xml, indent)
- [ ] XMLLite.uglify(xml, preserveComments)
- [ ] XMLLite.sanitize(xml, reverse)

### Converting

- [ ] XMLLite.dom2js(DOM)
- [ ] XMLLite.xml2js(xml)
- [ ] XMLLite.xml2json(xml, replacer, space)
- [ ] XMLLite.js2xml(obj, options)
- [ ] XMLLite.json2xml(json, options)
- [ ] XMLLite.js2dom(obj)
- [ ] XMLLite.json2dom(json)

## 1.0.0 (Works as expected)

- [ ] Works exactly the same in both Node.js and browsers
- [ ] Error tracking
- [ ] Optimizing

## 2.0.0 (Better structure and APIs)

