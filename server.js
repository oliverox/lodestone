/*eslint no-console: 0*/
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.js';
import config from './config';
import { match, RouterContext } from 'react-router';
import { routes } from 'routes';

const isProduction = process.env.NODE_ENV === 'production';
const app = new express();
const compiler = webpack(webpackConfig, function(err, stats) {
  if (err) {
    console.log('Webpack compilation fatal error:', err);
    return;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    console.log('Webpack compilation soft error:', jsonStats.errors);
    return;
  }
  if (jsonStats.warnings.length > 0) {
    console.log('Webpack compilation warning:', jsonStats.warnings);
    return;
  }
  console.log('Webpack compilation success. Now starting server...');
  startServer(jsonStats);
});

const renderPage = (appHtml, stats) => {
  let htmlContent = '<html lang="en-us"><head>';
  // add meta tags
  htmlContent += '<meta charset="utf8"/>';
  // add title
  htmlContent += '<title>Lodestone!</title>';
  // add favicon
  htmlContent += '<link rel="icon" type="image/x-icon" href="/favicon.ico">';
  // add styles if in prod
  htmlContent += (isProduction)? '<link rel="stylesheet" href="/dist/styles.css">' : '';
  // start body
  htmlContent += '</head><body>';
  // body content
  htmlContent += '<div id="app">' + appHtml + '</div>';
  // add script tag
  htmlContent += '<script src="' + stats.publicPath + (Array.isArray(stats.assetsByChunkName.main) ? stats.assetsByChunkName.main[0] : stats.assetsByChunkName.main) + '"></script>';
  // close html tag
  htmlContent += '</body></html>';

  return htmlContent;
};

const startServer = (stats) => {
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
  app.use(express.static(path.resolve(__dirname, 'public')));

  // serve all routes
  app.get('*', function (req, res) {
    console.log('Serving request', req.url);
    // match the routes to the url
    match({ routes: routes, location: req.url }, (err, redirect, props) => {
      // `RouterContext` is the what `Router` renders. `Router` keeps these
      // `props` in its state as it listens to `browserHistory`. But on the
      // server our app is stateless, so we need to use `match` to
      // get these props before rendering.
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        // if we got props then we matched a route and can render
        const appHtml = ReactDOM.renderToString(<RouterContext {...props}/>);
        res.send(renderPage(appHtml, stats));
      } else {
        // no errors, no redirect, we just didn't match anything
        res.status(404).send('Not Found');
      }
    });
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
};
