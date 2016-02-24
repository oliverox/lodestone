/** About screen
 *  Renders the About screen.
 */

import React from 'react';
import { Link } from 'react-router';

export const About = () => {
  return (
    <div className={'about'}>
      <h1>About</h1>
      <ul role="nav">
        <li><Link to="/">Home</Link></li>
      </ul>
    </div>
  );
};
