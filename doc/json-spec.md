JSON data structure spec
========================

## example

* [bookstore.json](../spec/fixtures/bookstore.json)
* [cd-catalog.json](../spec/fixtures/cd-catalog.json)
* [large.json](../spec/fixtures/large.json)
* [menu.json](../spec/fixtures/menu.json)
* [mmap-content.json](../spec/fixtures/mmap-content.json)
* [note.json](../spec/fixtures/note.json)
* [svg.json](../spec/fixtures/svg.json)

## nodes

### Document

Root node of the whole document.

structure:

```javascript
{
  type: 'Document',
  children: [/* */],
}
```

### ProcessingInstruction

ProcessingInstruction node (like `<?xml-stylesheet type="text/css" href="./bootstore.css"?>`).

structure:

```javascript
{
  "type": "ProcessingInstruction",
  "tag": "xml-stylesheet",
  "data": "type=\"text/css\" href=\"./bootstore.css\""
}
```

### Comment

Comment node (like `<!-- some comments -->`).

structure:

```javascript
{
  "type": "Comment",
  "data": " some comments "
}
```

### Element

Normal Element node (like `<book category="COOKING"></book>`).

structure:

```javascript
{
   "type": "Element",
   "tag": "bookstore",
   "children": [/* */]
}
```

### TextNode

TextNode (like `Everyday Italian`).

structure:

```javascript
{
  "type": "TextNode",
  "text": "Everyday Italian"
}
```

### DocumentType

### DocumentFragment

### CDATASection

