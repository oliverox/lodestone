/*eslint no-console: 0*/
import http from 'http';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import config from './config';

const app = new express();
const compiler = webpack(webpackConfig);

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

app.use(express.static(__dirname + '/static'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html', 'index.html'));
});

http.createServer(app).listen(config.port, function onAppListening(err) {
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
    console.info('----\n==> ✅  %s is running on http://%s:%s', config.app.title, config.host, config.port);
  }
});
