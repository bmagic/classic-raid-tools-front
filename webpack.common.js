const HtmlWebPackPlugin = require('html-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

module.exports = {

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'Fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin(['NODE_ENV', 'BACKEND_URL', 'DISCORD_REDIRECT_URI', 'DISCORD_CLIENT_ID', 'GITHUB_CLIENT_ID']),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
