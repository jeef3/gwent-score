import { put, takeEvery } from 'redux-saga/effects';

import { StateActions } from './reducer';
import Actions from './actions';

export function* handlePlayUnit() {
  yield put(StateActions.showModal());
}

export function* saga() {
  yield takeEvery(Actions.playUnit, handlePlayUnit);
}
