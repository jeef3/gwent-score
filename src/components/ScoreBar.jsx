import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Actions, Selector } from '../state';

const PlayerScore = styled.div`
  display: flex;
  flex-direction: ${({ currentPlayer, player }) =>
    currentPlayer === player ? 'row-reverse' : 'row'};
  grid-area: ${({ player }) => `player-${player}`};
  justify-self: ${({ currentPlayer, player }) =>
    currentPlayer === player ? 'flex-start' : 'flex-end'};
`;
PlayerScore.displayName = 'PlayerScore';

export default connect(
  state => ({
    currentPlayer: state.currentPlayer,
    players: Selector.getScores(state)
  }),
  dispatch => ({
    onSwapSides: () => dispatch(Actions.swapSides())
  })
)(({ currentPlayer, players: { playerA, playerB }, onSwapSides }) => (
  <div
    style={{
      alignSelf: 'center',
      padding: '0 10px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gridTemplateAreas:
        currentPlayer === 'a'
          ? '"player-a button player-b"'
          : '"player-b button player-a"',
      fontSize: 20
    }}
  >
    <PlayerScore currentPlayer={currentPlayer} player="a">
      <div>{playerA.name}</div>
      <div style={{ margin: '0 10px' }}>
        <strong>{playerA.score}</strong>
      </div>
    </PlayerScore>

    <div style={{ gridArea: 'button' }}>
      <button type="button" onClick={onSwapSides}>
        Swap
      </button>
    </div>

    <PlayerScore currentPlayer={currentPlayer} player="b">
      <div>{playerB.name}</div>
      <div style={{ margin: '0 10px' }}>
        <strong>{playerB.score}</strong>
      </div>
    </PlayerScore>
  </div>
));
