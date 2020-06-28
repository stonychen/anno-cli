import fs from 'fs'
require.extensions['.tm'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}
