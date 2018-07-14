import { createAction } from 'redux-helper';

export default {
  playLeader: createAction('PLAY_LEADER'),
  playUnit: createAction('PLAY_UNIT'),
  playSpecial: createAction('PLAY_SPECIAL')
};
