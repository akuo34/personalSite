const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './client/src/adminIndex.jsx'),
  output: {
    filename: 'bundle2.js',
    path: path.resolve(__dirname, './client/dist')
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/s,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: {
          loader:'css-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};