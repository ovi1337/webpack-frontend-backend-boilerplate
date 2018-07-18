require('ts-node').register({
  fast: true,
  noProject: true
})

module.exports = require('./config/webpack.ts')
