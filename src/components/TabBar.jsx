import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../state';

export default connect(
  null,
  dispatch => ({
    onPlayLeader: () => dispatch(Actions.playLeader()),
    onPlayUnit: () => dispatch(Actions.playUnit()),
    onPlaySpecial: () => dispatch(Actions.playSpecial())
  })
)(({ onPlayLeader, onPlayUnit, onPlaySpecial }) => (
  <div
    style={{
      display: 'flex',
      backgroundColor: 'lightgray',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}
  >
    <button type="button" onClick={onPlayLeader}>
      Play Leader
    </button>
    <button type="button" onClick={onPlayUnit}>
      Play Unit
    </button>
    <button type="button" onClick={onPlaySpecial}>
      Play Special
    </button>
  </div>
));
