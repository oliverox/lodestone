/*eslint no-console: 0*/
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.js';
import config from './config';
import { match, RouterContext } from 'react-router';
import { routes } from './src/routes';

const isProduction = process.env.NODE_ENV === 'production';
const app = new express();
const compiler = webpack(webpackConfig);
const publicPath = path.resolve(__dirname, 'public');

const renderPage = (appHtml) => {
  return `
    <html lang="en-us">
      <head>
        <meta charset="utf8"/>
        <title>Lodestone!</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
};

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

// serve all routes
app.get('*', function (req, res) {
  // if (req.url === '/favicon.ico') {
  //   res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  //   res.end();
  //   console.log('favicon requested');
  //   return;
  // }
  console.log('..............server request');
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props1) => {
    // `RouterContext` is the what `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = ReactDOM.renderToString(<RouterContext {...props1}/>)
    res.send(renderPage(appHtml))
  })
  /*
  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(
      <html lang="en-us">
        <head>
          <meta charSet="utf8"/>
          <title>Lodestone!</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="/dist/bundle.js"></script>
        </body>
      </html>
    ));
  */
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
