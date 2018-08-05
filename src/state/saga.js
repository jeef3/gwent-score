import { put, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid';

import { StateActions } from './reducer';
import Actions from './actions';

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
}

export function* handlePlayWeather() {
  yield put(StateActions.modalShown({ dialog: 'weather', data: {} }));
}

export function* handleCloseModal() {
  yield put(StateActions.modalHidden());
}

export function* handleAddCard(action) {
  const card = {
    ...action.payload.card,
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
}

export function* handleEditCard(action) {
  const {
    payload: { card }
  } = action;

  yield put(StateActions.cardEdited({ card }));
  yield put(StateActions.modalHidden());
}

export function* handleRemoveCard(action) {
  const {
    payload: { card }
  } = action;

  yield put(StateActions.cardRemoved({ card }));
  yield put(StateActions.modalHidden());
}

export function* handleClearWeather() {
  yield put(StateActions.clearWeather());
  yield put(StateActions.modalHidden());
}

export function* handleRestart() {
  yield put(StateActions.restart());
}

export function* handleScorch() {
  yield put(StateActions.scorch());
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
}
