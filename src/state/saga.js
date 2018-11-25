import { call, put, select, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid';
import firebase from 'firebase/app';

import { StateActions } from './reducer';
import Actions from './actions';

const db = firebase.firestore();
const doSend = gameState =>
  db
    .collection('gameState')
    .doc('current')
    .set({
      cards: gameState.cards || [],
      players: gameState.players
    });

function* sendGameState() {
  const { players, cards } = yield select(state => state);
  yield call(doSend, { players, cards });
}

export function* handlePlayUnit(action) {
  const {
    payload: { card }
  } = action;

  yield put(StateActions.modalShown({ dialog: 'unit', data: card }));
}

export function* handleEditUnit(action) {
  const {
    payload: { card }
  } = action;

  yield put(StateActions.modalShown({ dialog: 'unit', data: card }));
  yield call(sendGameState);
}

export function* handlePlayWeather() {
  yield put(StateActions.modalShown({ dialog: 'weather', data: {} }));
}

export function* handleCloseModal() {
  yield put(StateActions.modalHidden());
}

const CLEAN_PROPS = [
  'attr',
  'combat',
  'hero',
  'id',
  'player',
  'points',
  'special'
];
const cleanCard = dirtyCard =>
  CLEAN_PROPS.reduce(
    (p, prop) =>
      dirtyCard[prop] === undefined ? p : { ...p, [prop]: dirtyCard[prop] },
    {}
  );

export function* handleAddCard(action) {
  const card = {
    ...cleanCard(action.payload.card),
    id: uuid()
  };

  yield put(StateActions.cardAdded({ card }));
  yield put(StateActions.modalHidden());

  if (card.attr === 'scorch') {
    yield put(
      StateActions.scorch({
        player: card.player === 'a' ? 'b' : 'a',
        combat: card.combat
      })
    );
  }

  yield call(sendGameState);
}

export function* handleEditCard(action) {
  const card = cleanCard(action.payload.card);

  yield put(StateActions.cardEdited({ card }));
  yield put(StateActions.modalHidden());
  yield call(sendGameState);
}

export function* handleRemoveCard(action) {
  const card = cleanCard(action.payload.card);

  yield put(StateActions.cardRemoved({ card }));
  yield put(StateActions.modalHidden());
  yield call(sendGameState);
}

export function* handleClearWeather() {
  yield put(StateActions.clearWeather());
  yield put(StateActions.modalHidden());
  yield call(sendGameState);
}

export function* handleRestart() {
  yield put(StateActions.restart());
  yield call(sendGameState);
}

export function* handleScorch() {
  yield put(StateActions.scorch());
  yield call(sendGameState);
}

export function* handleSwapSides() {
  yield put(StateActions.sidesSwapped());
}

export function* handleReceiveGameState(action) {
  const {
    payload: { players, cards }
  } = action;
  yield put(StateActions.gameStateUpdated({ players, cards }));
}

export function* saga() {
  yield takeEvery(Actions.playUnit.type, handlePlayUnit);
  yield takeEvery(Actions.editUnit.type, handleEditUnit);
  yield takeEvery(Actions.playWeather.type, handlePlayWeather);
  yield takeEvery(Actions.closeModal.type, handleCloseModal);

  yield takeEvery(Actions.addCard.type, handleAddCard);
  yield takeEvery(Actions.editCard.type, handleEditCard);
  yield takeEvery(Actions.removeCard.type, handleRemoveCard);

  yield takeEvery(Actions.clearWeather.type, handleClearWeather);

  yield takeEvery(Actions.restart.type, handleRestart);

  yield takeEvery(Actions.scorch.type, handleScorch);
  yield takeEvery(Actions.swapSides.type, handleSwapSides);

  yield takeEvery(Actions.receiveGameState.type, handleReceiveGameState);
}
