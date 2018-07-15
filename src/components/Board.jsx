import React from 'react';
import { connect } from 'react-redux';

import { getPlayerAClose, getPlayerACloseScore } from '../state/selectors';

export default connect(state => ({
  cards: getPlayerAClose(state),
  closeScore: getPlayerACloseScore(state)
}))(({ cards, closeScore }) => (
  <div>
    <div>Close</div>
    <div>{cards.map(card => <div>{card.points}</div>)}</div>
    <h2>{closeScore}</h2>
    <div>Ranged</div>
    <div>Siege</div>
  </div>
));
