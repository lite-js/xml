const js2dom = require('./js2dom')

module.exports = (text) => js2dom(JSON.parse(text))
