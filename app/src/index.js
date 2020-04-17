import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import './index.css';
import App from '#root/components/App/App';
import * as serviceWorker from './serviceWorker';

dotenv.config({ path: '../../.env' });

console.log('Test 1');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
