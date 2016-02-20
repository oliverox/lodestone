/*eslint no-console: 0*/
if (module.hot) {
  console.debug('module.hot === true');
  module.hot.accept();
}
import './styles/main.scss';
import styles from './styles/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import { SimpleButton } from 'components';

console.log('SimpleButton:', SimpleButton, styles);
const dest = document.getElementById('app');
const onButtonClick = () => {
  console.log('button was clicked! hmm');
};
ReactDOM.render(<SimpleButton type={'primary'} onClick={onButtonClick}>Simple button 1</SimpleButton>, dest);
