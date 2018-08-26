import { createAction } from 'redux-helper';

export default {
  playLeader: createAction('PLAY_LEADER'),
  playUnit: createAction('PLAY_UNIT'),
  playSpecial: createAction('PLAY_SPECIAL'),
  playWeather: createAction('PLAY_WEATHER'),

  editUnit: createAction('EDIT_UNIT'),

  addCard: createAction('ADD_CARD'),
  editCard: createAction('EDIT_CARD'),
  removeCard: createAction('REMOVE_CARD'),

  closeModal: createAction('CLOSE_MODAL'),

  clearWeather: createAction('CLEAR_WEATHER'),
  scorch: createAction('SCORCH'),

  restart: createAction('RESTART'),
  swapSides: createAction('SWAP_SIDES'),

  receiveGameState: createAction('RECEIVE_GAME_STATE')
};
