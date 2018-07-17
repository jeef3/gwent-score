import { put, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid';

import { StateActions } from './reducer';
import Actions from './actions';

export function* handlePlayUnit() {
  yield put(StateActions.modalShown({ dialog: 'new', data: {} }));
}

export function* handleEditUnit(action) {
  const {
    payload: { card }
  } = action;

  yield put(StateActions.modalShown({ dialog: 'edit', data: card }));
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

export function* handleEditCard(action) {
  const {
    payload: { card }
  } = action;

  yield put(StateActions.cardEdited({ card }));
  yield put(StateActions.modalHidden());
}
export function* saga() {
  yield takeEvery(Actions.playUnit.type, handlePlayUnit);
  yield takeEvery(Actions.editUnit.type, handleEditUnit);
  yield takeEvery(Actions.closeModal.type, handleCloseModal);
  yield takeEvery(Actions.addCard.type, handleAddCard);
  yield takeEvery(Actions.editCard.type, handleEditCard);
}
