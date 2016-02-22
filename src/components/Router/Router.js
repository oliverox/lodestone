/*eslint no-console: 0*/
import React from 'react';
import { Router as ReactRouter, Route, browserHistory, IndexRoute } from 'react-router';
import { Home, About } from 'screens';

export const Router = () => {
  return (
    <ReactRouter history={browserHistory}>
      <IndexRoute component={Home}/>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </ReactRouter>
  );
};
