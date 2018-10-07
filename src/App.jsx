import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import Board from './components/Board';
import DialogManager from './components/DialogManager';
import PageLayout from './components/PageLayout';
import TabBar from './components/TabBar';
import ScoreBar from './components/ScoreBar';
import { saga, reducer, Actions } from './state';
import conn from './connection';

const composeEnhancers = composeWithDevTools({ name: 'Client' });
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

const App = () => (
  <Provider store={store}>
    <React.Fragment>
      <PageLayout>
        <ScoreBar />
        <Board />
        <TabBar />
      </PageLayout>

      <DialogManager />
    </React.Fragment>
  </Provider>
);

sagaMiddleware.run(saga);

conn.addEventListener('message', message => {
  const gameState = JSON.parse(message.data);
  store.dispatch(Actions.receiveGameState(gameState));
});

export default App;
