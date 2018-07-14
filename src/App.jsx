import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// import styled from 'styled-components';

import Board from './components/Board';
import PageLayout from './components/PageLayout';
import TabBar from './components/TabBar';
import { saga, reducer } from './state';

const composeEnhancers = composeWithDevTools({ name: 'Client' });
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

const App = () => (
  <Provider store={store}>
    <PageLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>Haley</div>
        <div>Jeff</div>
      </div>

      <Board />

      <TabBar />
    </PageLayout>
  </Provider>
);

sagaMiddleware.run(saga);

export default App;
