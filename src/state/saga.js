import { put, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid';

import { StateActions } from './reducer';
import Actions from './actions';

export function* handlePlayUnit() {
  yield put(StateActions.modalShown());
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
}

export function* saga() {
  yield takeEvery(Actions.playUnit.type, handlePlayUnit);
  yield takeEvery(Actions.closeModal.type, handleCloseModal);
  yield takeEvery(Actions.addCard.type, handleAddCard);
}
