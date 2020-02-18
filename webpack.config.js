const path = require('path')

module.exports = {
  mode: 'none',
  watch: true,
  entry: {
    processors: './processors/background.js',
    views: './views/context.js'
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name]/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
