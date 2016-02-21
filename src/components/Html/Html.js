/*eslint no-console: 0*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import { SimpleButton } from '../../components';

export default class Html extends Component {
  render() {
    const content = ReactDOM.renderToString(<SimpleButton type={'primary'}>Simple button 2</SimpleButton>);
    console.log('SimpleButton', SimpleButton);

    return (
      <html lang="en-us">
        <head>
          <meta charset="utf8"/>
          <title dangerouslySetInnerHTML={"Lodestone!"}/>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: content}}/>
          <script src="/dist/bundle.js"></script>
        </body>
      </html>
    );
  }
}
Html.propTypes = {
  component: PropTypes.node
};
