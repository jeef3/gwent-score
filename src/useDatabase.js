import { useContext, useEffect } from 'react';
import firebase from 'firebase/app';

import { Actions } from './state';
import { GameStateContext } from './GameState';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const useDatabase = () => {
  const { dispatch } = useContext(GameStateContext);

  useEffect(() => {
    db.collection('gameState')
      .doc('current')
      .onSnapshot(snapshot => {
        dispatch(Actions.receiveGameState(snapshot.data()));
      });
  });
};

export default useDatabase;
