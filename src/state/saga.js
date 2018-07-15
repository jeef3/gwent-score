import { put, takeEvery } from 'redux-saga/effects';

import { StateActions } from './reducer';
import Actions from './actions';

export function* handlePlayUnit() {
  yield put(StateActions.modalShown());
}

export function* handleCloseModal() {
  yield put(StateActions.modalHidden());
}

export function* saga() {
  yield takeEvery(Actions.playUnit.type, handlePlayUnit);
  yield takeEvery(Actions.closeModal.type, handleCloseModal);
}
