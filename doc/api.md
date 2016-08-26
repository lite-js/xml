API
===

## properties

name | description 
-----|------------
domParser     | instance of DOMParser
xmlSerializer | instance of XMLSerializer

## methods

### parsing/serializing

name | alias | parameters | return value | description
-----|-------|------------|--------------|------------
parse     | parseFromString   | String str   | Document doc | parsing a xml string
serialize | serializeToString | Document doc | String str   | Document to xml string

### converting

name | alias | parameters | return value | description
-----|-------|------------|--------------|------------
dom2js   |  |  |  | 
js2xml   |  |  |  | 
json2xml |  |  |  | 
xml2js   |  |  |  | 
xml2json |  |  |  | 


### DOM maintaining

name | alias | parameters | return value | description
-----|-------|------------|--------------|------------
findChildNode         |  |  |  | 
findChildNodes        |  |  |  | 
findOrCreateChildNode |  |  |  | 
eachChildNode         |  |  |  | 
removeChildNode       |  |  |  | 

### formatting

name | alias | parameters | return value | description
-----|-------|------------|--------------|------------
beautify |  |  |  | 
uglify   |  |  |  | 

