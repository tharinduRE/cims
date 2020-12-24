import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;


ReactDOM.render(
  <React.StrictMode>
    <App basename={PUBLIC_URL}/>
  </React.StrictMode>,
  document.getElementById('root')
);
