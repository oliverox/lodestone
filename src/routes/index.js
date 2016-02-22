/*eslint no-console: 0*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, About } from 'screens';

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
  </Route>
);
