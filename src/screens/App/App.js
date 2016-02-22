/** App screen
 *  Renders the App shell.
 */

import React from 'react';

export const App = (props) => {
  return (
    <div className={'root'}>
      <div className={'nav'}>NavBar</div>
      <div id="screen">{props.children}</div>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node.isRequired
};
