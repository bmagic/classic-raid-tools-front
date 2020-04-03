const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { EnvironmentPlugin } = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      BACKEND_URL: 'http://localhost:3000',
      DISCORD_REDIRECT_URI: 'https://localhost:8080/auth-discord',
      DISCORD_CLIENT_ID: '682243386228473873',
      GITHUB_CLIENT_ID: '5183c8d1fe3cd5ecce7b'
    })
  ]
})
