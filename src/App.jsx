import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import firebase from 'firebase/app';

import Board from './components/Board';
import DialogManager from './components/DialogManager';
import PageLayout from './components/PageLayout';
import TabBar from './components/TabBar';
import ScoreBar from './components/ScoreBar';
import { saga, reducer, Actions } from './state';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

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

db.collection('gameState')
  .doc('current')
  .onSnapshot(snapshot => {
    store.dispatch(Actions.receiveGameState(snapshot.data()));
  });

export default App;
