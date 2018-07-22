import React from 'react';
import { connect } from 'react-redux';

import { Selector } from '../state';

export default connect(state => ({
  playerAScore: Selector.getPlayerAScore(state),
  playerBScore: Selector.getPlayerBScore(state)
}))(({ playerAScore, playerBScore }) => (
  <div
    style={{
      alignSelf: 'center',
      padding: '0 10px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 20
    }}
  >
    <div>
      Haley <strong>{playerAScore}</strong>
    </div>
    <div>
      <strong>{playerBScore}</strong> Jeff
    </div>
  </div>
));
