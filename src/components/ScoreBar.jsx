import React from 'react';
// import { connect } from 'react-redux';
import { inject } from 'mobx-react';

// import { Selector } from '../state';

// export default connect(state => ({
//   players: Selector.getScores(state)
// }))(({ players: { playerA, playerB } }) => (
const ScoreBar = inject('cards', 'players')(
  ({ players: { playerA, playerB } }) => (
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
        {playerA.name} <strong>{playerA.score}</strong>
      </div>
      <div>
        <strong>{playerB.score}</strong> {playerB.name}
      </div>
    </div>
  )
);

export default ScoreBar;
