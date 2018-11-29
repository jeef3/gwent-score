import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';

import Board from './components/Board';
import DialogManager from './components/DialogManager';
import PageLayout from './components/PageLayout';
import TabBar from './components/TabBar';
import ScoreBar from './components/ScoreBar';
// import { saga, reducer, Actions, StateActions } from './state';
import useDatabase from './useDatabase';

// const composeEnhancers = composeWithDevTools({ name: 'Client' });
// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );
//

const App = () => {
  useDatabase();

  return (
    <>
      <PageLayout>
        <ScoreBar />
        <Board />
        <TabBar />
      </PageLayout>

      <DialogManager />
    </>
  );
};

// sagaMiddleware.run(saga);

export default App;
