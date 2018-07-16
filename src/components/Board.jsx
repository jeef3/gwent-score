import React from 'react';
import { connect } from 'react-redux';

import { getFullBoard } from '../state/selectors';

export default connect(state => ({
  board: getFullBoard(state)
}))(({ board }) => (
  <div>
    <div>
      <div>Close</div>
      <div>{board.playerA.close.cards.map(c => <div>{c.points}</div>)}</div>
      <h2>{board.playerA.close.score}</h2>
      <div>Ranged</div>
      <div>{board.playerA.ranged.cards.map(c => <div>{c.points}</div>)}</div>
      <h2>{board.playerA.ranged.score}</h2>
      <div>Siege</div>
      <div>{board.playerA.siege.cards.map(c => <div>{c.points}</div>)}</div>
      <h2>{board.playerA.siege.score}</h2>
    </div>
    <div>
      <div>Close</div>
      <div>{board.playerB.close.cards.map(c => <div>{c.points}</div>)}</div>
      <h2>{board.playerB.close.score}</h2>
      <div>Ranged</div>
      <div>{board.playerB.ranged.cards.map(c => <div>{c.points}</div>)}</div>
      <h2>{board.playerB.ranged.score}</h2>
      <div>Siege</div>
      <div>{board.playerB.siege.cards.map(c => <div>{c.points}</div>)}</div>
      <h2>{board.playerB.siege.score}</h2>
    </div>
  </div>
));
