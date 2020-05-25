const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    filename: 'main.[contenthash].js'
  },
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
        use: ['babel-loader','source-map-loader']
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
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
