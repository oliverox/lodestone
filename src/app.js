/*eslint no-console: 0*/
if (module.hot) {
  console.debug('module.hot === true');
  module.hot.accept();
}
import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Home, About } from 'screens';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'));
