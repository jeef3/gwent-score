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
import { saga, reducer } from './state';

const ws = new WebSocket('ws://localhost:3001');

const composeEnhancers = composeWithDevTools({ name: 'Client' });
const sagaMiddleware = createSagaMiddleware();

const wsMiddleware = store => next => action => {
  console.log('sending to ws');

  if (action.type.startsWith('→')) {
    ws.send(JSON.stringify(action));
  }

  return next(action);
};

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, wsMiddleware))
);

const App = () => (
  <Provider store={store}>
    <div>
      <PageLayout>
        <ScoreBar />
        <Board />
        <TabBar />
      </PageLayout>

      <DialogManager />
    </div>
  </Provider>
);

sagaMiddleware.run(saga);

ws.addEventListener('message', message => {
  const action = JSON.parse(message.data);
  store.dispatch(action);
});

export default App;
