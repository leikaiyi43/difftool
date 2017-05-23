var path = require('path');

module.exports = {
  entry: './components/index/IndexPage.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/components/')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};