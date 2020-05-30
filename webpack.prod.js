const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { EnvironmentPlugin } = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      BACKEND_URL: 'https://api.owls-classic.fr',
      DISCORD_REDIRECT_URI: 'https://owls-classic.fr/auth-discord',
      DISCORD_CLIENT_ID: '682243386228473873',
      GITHUB_CLIENT_ID: '5183c8d1fe3cd5ecce7b'
    })
  ]
})
