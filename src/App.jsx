import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// import styled from 'styled-components';

import { saga, reducer } from './state';

const composeEnhancers = composeWithDevTools({ name: 'Client' });
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

const App = () => (
  <Provider store={store}>
    <div>Gwent</div>
  </Provider>
);

sagaMiddleware.run(saga);

export default App;
