/*eslint no-console: 0*/
if (module.hot) {
  console.debug('module.hot === true');
  module.hot.accept();
}
var withStyles = require('isomorphic-style-loader/lib/withStyles');
// import './styles/app.scss';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, browserHistory } from 'react-router';
// import { routes } from 'routes';
//
// ReactDOM.render(<Router routes={routes} history={browserHistory}/>, document.getElementById('app'));
var s = require('./styles/test.scss');
function MyApp() {
  console.log('client-side: app is running yay!');
  console.log('client-side: classname for test=', s.test);
}

withStyles.default(MyApp, s)();
