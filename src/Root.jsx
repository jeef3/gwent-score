import React from 'react';

import App from './App';
import { GameStateContextProvider } from './GameState';

const Root = () => (
  <GameStateContextProvider>
    <App />
  </GameStateContextProvider>
);

export default Root;
