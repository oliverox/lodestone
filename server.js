/*eslint no-console: 0*/
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.js';
import config from './config';

const isProduction = process.env.NODE_ENV === 'production';
const app = new express();
const compiler = webpack(webpackConfig);
const publicPath = path.resolve(__dirname, 'public');

if (!isProduction) {
  console.log('Initializing HMR...');
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    quiet: false,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

// serve static files from public folder
app.use(express.static(publicPath));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html', 'index.html'));
});

app.listen(config.port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('\n' +
    '██╗      ██████╗ ██████╗ ███████╗███████╗████████╗ ██████╗ ███╗   ██╗███████╗\n' +
    '██║     ██╔═══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝\n' +
    '██║     ██║   ██║██║  ██║█████╗  ███████╗   ██║   ██║   ██║██╔██╗ ██║█████╗  \n' +
    '██║     ██║   ██║██║  ██║██╔══╝  ╚════██║   ██║   ██║   ██║██║╚██╗██║██╔══╝  \n' +
    '███████╗╚██████╔╝██████╔╝███████╗███████║   ██║   ╚██████╔╝██║ ╚████║███████╗\n' +
    '╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝\n');
    console.info('----\n==> ✅  %s [%s] is running on http://%s:%s', config.app.title, (isProduction? 'PRODUCTION' : 'DEVELOPMENT'), config.host, config.port);
  }
});
