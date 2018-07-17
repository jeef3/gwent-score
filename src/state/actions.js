import { createAction } from 'redux-helper';

export default {
  playLeader: createAction('PLAY_LEADER'),
  playUnit: createAction('PLAY_UNIT'),
  playSpecial: createAction('PLAY_SPECIAL'),

  editUnit: createAction('EDIT_UNIT'),

  addCard: createAction('ADD_CARD'),
  editCard: createAction('EDIT_CARD'),

  closeModal: createAction('CLOSE_MODAL')
};
