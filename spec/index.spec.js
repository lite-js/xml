mocha.setup('bdd');

require('./dom2js.spec');
require('./xml2js.spec');

mocha.run();
