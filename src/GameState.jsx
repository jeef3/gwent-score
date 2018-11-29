import React, { createContext, useReducer } from 'react';

import initalState from './state/state';
import { reducer } from './state';

const GameStateContext = createContext();

const GameStateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

const GameStateContextConsumer = GameStateContext.Consumer;

export { GameStateContext, GameStateContextProvider, GameStateContextConsumer };
