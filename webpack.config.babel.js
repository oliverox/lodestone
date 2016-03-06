/*eslint no-console: 0*/
import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const buildPath = path.resolve(__dirname, 'public', 'dist');
const bundleName = 'bundle.js';
const publicPath = '/dist/';
const entryFiles = ['./src/app.js'];
const loaders = [];
loaders.push([
  { test: /\.js$/, exclude: /node_modules/, loaders: ['babel', 'eslint']},
  { test: /\.json$/, loader: 'json-loader' }
]);
if (isProduction) {
  loaders.push({ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap') });
} else {
  loaders.push({ test: /\.scss$/, loader: 'style-loader!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap' });
}

// For Development
const devConfig = {
  devtool: 'eval',
  context: path.resolve(__dirname),
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'].concat(entryFiles),
  output: {
    path: buildPath,
    publicPath: publicPath,
    filename: bundleName
  },
  module: {
    loaders: loaders
  },
  resolve: {
    root: [
      path.resolve('./src')
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(), // when moving to webpack 2.0, change line to: new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

// For Production
const prodConfig = {
  devtool: 'source-map',
  context: path.resolve(__dirname),
  entry: entryFiles,
  output: {
    path: buildPath,
    publicPath: publicPath,
    filename: bundleName
  },
  module: {
    loaders: loaders
  },
  resolve: {
    root: [
      path.resolve('./src')
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(), // when moving to webpack 2.0, change line to: new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = (isProduction? prodConfig : devConfig);
