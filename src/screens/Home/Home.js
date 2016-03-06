/** Home screen
 *  Renders the Home screen.
 */

import React from 'react';
import { Link } from 'react-router';
import { SimpleButton } from '../../components';

export const Home = () => {
  return (
    <div className={'home'}>
      <h1>Home</h1>
      <ul role="nav">
        <li><Link to="/about">About</Link></li>
        <li><SimpleButton type="primary">SimpleButton</SimpleButton></li>
      </ul>
    </div>
  );
};
