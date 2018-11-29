import React from 'react';
import ReactDOM from 'react-dom';

import './connection';
import Root from './Root';
import injectGlobalStyles from './injectGlobalStyles';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(React.createElement(Root), document.getElementById('root'));
injectGlobalStyles();
registerServiceWorker();
