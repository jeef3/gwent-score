import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../state';

export default connect(
  null,
  dispatch => ({
    onPlayLeader: () => dispatch(Actions.playLeader()),
    onRestart: () => dispatch(Actions.restart()),
    onPlayWeather: () => dispatch(Actions.playWeather())
  })
)(({ onPlayLeader, onRestart, onPlayWeather }) => (
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
    <button type="button" onClick={onRestart}>
      Restart
    </button>
    <button type="button" onClick={onPlayWeather}>
      Play Weather
    </button>
  </div>
));
