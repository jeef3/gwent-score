import React from 'react';
import ReactDOM from 'react-dom';

import './connection';
import App from './App';
import injectGlobalStyles from './injectGlobalStyles';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
injectGlobalStyles();
registerServiceWorker();
