import React from 'react';
import { connect } from 'react-redux';

import { getPlayerAClose } from '../state/selectors';

export default connect(state => ({
  cards: getPlayerAClose(state)
}))(({ cards }) => (
  <div>
    <div>Close</div>
    <div>{cards.map(card => <div>{card.points}</div>)}</div>
    <div>Ranged</div>
    <div>Siege</div>
  </div>
));
