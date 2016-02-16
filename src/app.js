/*eslint no-console: 0*/
if (module.hot) {
  module.hot.accept();
}
import mainStyles from './styles/main.scss';
import styles from './styles/app.scss';
// import React from 'react';
import ReactDOM from 'react-dom';

import { SimpleButton } from './elements';

console.log('mainStyles=', mainStyles, styles);
// var testNode = document.createElement('div');
// var textNode = document.createTextNode('This is Lodestone!');
// testNode.appendChild(textNode);
// testNode.className = styles.test;
// document.getElementById('app').appendChild(testNode);
// document.getElementsByTagName('html')[0].style.backgroundColor = "pink";
const dest = document.getElementById('app');
const onButtonClick = () => {
  console.log('button was clicked!');
};
ReactDOM.render(<SimpleButton onClick={onButtonClick}>Simple button</SimpleButton>, dest);