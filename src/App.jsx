import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider as MobxProvider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import appStore from './stores/appStore';
import boardStore from './stores/boardStore';
import playersStore from './stores/playersStore';
import Board from './components/Board';
import { Component as DialogManager } from './components/DialogManager';
import PageLayout from './components/PageLayout';
import TabBar from './components/TabBar';
import ScoreBar from './components/ScoreBar';
// import { saga, reducer } from './state';

// const composeEnhancers = composeWithDevTools({ name: 'Client' });
// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );

const stores = {
  app: appStore,
  board: boardStore,
  players: playersStore
};

const App = () => (
  <MobxProvider {...stores}>
    <React.Fragment>
      <PageLayout>
        <ScoreBar />
        <Board />
        <TabBar />
      </PageLayout>

      <DialogManager />

      <DevTools />
    </React.Fragment>
  </MobxProvider>
);

// sagaMiddleware.run(saga);

export default App;
