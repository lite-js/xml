#!/usr/bin/env node
const XMLLite = require('../../lib/index');

const divDoc = XMLLite.parse(`<div>
  <x-component attr="\${data|camelCase}">
    \${foo.bar|camelCase}
  </x-component>
  <x-component attr="\${relativeDate|relativeDate}">
    \${relativeDate|relativeDate}
  </x-component>
</div>`).documentElement;

divDoc.setAttribute('hello', '${testing|vertical|var}');

console.log(XMLLite.serialize(divDoc, true));
