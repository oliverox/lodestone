/*eslint no-console: 0*/
import webpack from 'webpack';
import path from 'path';

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname),
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/app.js'
  ],
  output: {
    path: '/',
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel', 'eslint']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap' }
    ]
  },
  resolve: {
    root: [
      path.resolve('./src')
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(), // when moving to webpack 2.0, change line to: new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(), // when moving to webpack 2.0, change line to: new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
