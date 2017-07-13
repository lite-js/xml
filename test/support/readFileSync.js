const {
  readFileSync
} = require('fs')
const {
  resolve
} = require('path')

module.exports = pathname => readFileSync(resolve(process.cwd(), pathname), 'utf8')
