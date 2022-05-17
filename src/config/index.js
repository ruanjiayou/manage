const devConfig = require('./dev')
const prodConfig = require('./prod')
let config = {};
if (process.env.NODE_ENV === 'dev') {
  config = devConfig
}
if (process.env.NODE_ENV === 'prod') {
  config = prodConfig
}

module.exports = config;