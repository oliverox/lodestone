/*eslint no-console: 0*/
if (module.hot) {
  console.debug('module.hot === true');
  module.hot.accept();
}
import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { routes } from 'routes';

ReactDOM.render(<Router routes={routes} history={browserHistory}/>, document.getElementById('app'));
