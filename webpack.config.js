var webpack = require('webpack');

module.exports = {
  entry: "./entry.js",
  output: {
    path: "public",
    filename: "bundle.js"
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};
