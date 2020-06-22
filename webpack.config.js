const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/s,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 
            '@babel/preset-react',
            {
              plugins: ["@babel/plugin-proposal-class-properties"]
            }]
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