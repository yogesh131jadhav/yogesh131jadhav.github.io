import React from 'react';
import ReactDOM from 'react-dom';
// import bootstrap from 'bootstrap';
// import reactfontawesome from 'react-fontawesome';
import './index.css';
import './css/style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
