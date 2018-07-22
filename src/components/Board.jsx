import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Actions, Selector } from '../state';
import Card from './Card';

const Row = styled.div`
  margin: 0 0 5px;

  border: solid 1px lightgray;

  display: grid;
  grid-template-columns: 1fr 50px 50px;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    'name name name'
    'cards score add';
`;
Row.displayName = 'Row';

const RowName = styled.h2`
  margin: 0;

  grid-area: name;
  align-self: center;
`;
RowName.displayName = 'RowName';
const CombatRow = styled.div`
  display: flex;

  grid-area: cards;
`;
CombatRow.displayName = 'CombatRow';

const Add = styled.button`
  cursor: pointer;
  grid-area: add;
`;
Add.displayName = 'Add';

const Score = styled.h2`
  margin: 0;

  grid-area: score;
`;
Score.displayName = 'Score';

const Scroller = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;
Scroller.displayName = 'Scroller';

export default connect(
  state => ({
    board: Selector.getFullBoard(state)
  }),
  dispatch => ({
    onCardClick: card => dispatch(Actions.editUnit({ card })),
    playerA: {
      onPlaySiege: () =>
        dispatch(Actions.playUnit({ card: { player: 'a', combat: 'siege' } })),
      onPlayRanged: () =>
        dispatch(Actions.playUnit({ card: { player: 'a', combat: 'ranged' } })),
      onPlayClose: () =>
        dispatch(Actions.playUnit({ card: { player: 'a', combat: 'close' } }))
    },
    playerB: {
      onPlayClose: () =>
        dispatch(Actions.playUnit({ card: { player: 'b', combat: 'close' } })),
      onPlayRanged: () =>
        dispatch(Actions.playUnit({ card: { player: 'b', combat: 'ranged' } })),
      onPlaySiege: () =>
        dispatch(Actions.playUnit({ card: { player: 'b', combat: 'siege' } }))
    }
  })
)(({ board, onCardClick, playerA, playerB }) => (
  <Scroller>
    <div>
      <Row>
        <RowName>Siege</RowName>
        <CombatRow>
          {board.playerA.siege.cards.map(c => (
            <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
          ))}
        </CombatRow>
        <Add onClick={playerA.onPlaySiege}>+</Add>
        <Score>{board.playerA.siege.score}</Score>
      </Row>
      <Row>
        <RowName>Ranged</RowName>
        <CombatRow>
          {board.playerA.ranged.cards.map(c => (
            <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
          ))}
        </CombatRow>
        <Add onClick={playerA.onPlayRanged}>+</Add>
        <Score>{board.playerA.ranged.score}</Score>
      </Row>
      <Row>
        <RowName>Close</RowName>
        <CombatRow>
          {board.playerA.close.cards.map(c => (
            <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
          ))}
        </CombatRow>
        <Add onClick={playerA.onPlayClose}>+</Add>
        <Score style={{ gridArea: 'score' }}>{board.playerA.close.score}</Score>
      </Row>
    </div>
    <hr />
    <div>
      <Row>
        <RowName>Close</RowName>
        <CombatRow>
          {board.playerB.close.cards.map(c => (
            <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
          ))}
        </CombatRow>
        <Add onClick={playerB.onPlayClose}>+</Add>
        <Score>{board.playerB.close.score}</Score>
      </Row>
      <Row>
        <RowName>Ranged</RowName>
        <CombatRow>
          {board.playerB.ranged.cards.map(c => (
            <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
          ))}
        </CombatRow>
        <Add onClick={playerB.onPlayRanged}>+</Add>
        <Score>{board.playerB.ranged.score}</Score>
      </Row>
      <Row>
        <RowName>Siege</RowName>
        <CombatRow>
          {board.playerB.siege.cards.map(c => (
            <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
          ))}
        </CombatRow>
        <Add onClick={playerB.onPlaySiege}>+</Add>
        <Score>{board.playerB.siege.score}</Score>
      </Row>
    </div>
  </Scroller>
));
