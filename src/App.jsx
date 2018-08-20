import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'mobx-react';

import cardsStore from './stores/cardsStore';
import Board from './components/Board';
import DialogManager from './components/DialogManager';
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
  cardsStore
};

const App = () => (
  <Provider {...stores}>
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

// sagaMiddleware.run(saga);

export default App;
