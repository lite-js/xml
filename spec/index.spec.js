mocha.setup('bdd');

require('./dom2js.spec');
require('./js2xml.spec');
require('./xml2js.spec');

mocha.run();
