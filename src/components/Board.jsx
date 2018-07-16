import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getFullBoard } from '../state/selectors';

const Row = styled.div`
  margin: 0 0 5px;

  border: solid 1px lightgray;

  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    'name name'
    'cards score';
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

const Card = styled.div`
  margin: 2px;
  padding: 2px;

  border: solid 1px black;

  background: lightgray;
`;
Card.displayName = 'Card';

const Score = styled.h2`
  margin: 0;

  grid-area: score;
`;
Score.displayName = 'Score';

export default connect(state => ({
  board: getFullBoard(state)
}))(({ board }) => (
  <div>
    <div>
      <Row>
        <RowName>Close</RowName>
        <CombatRow>
          {board.playerA.close.cards.map(c => <Card>{c.points}</Card>)}
        </CombatRow>
        <Score style={{ gridArea: 'score' }}>{board.playerA.close.score}</Score>
      </Row>
      <Row>
        <RowName>Ranged</RowName>
        <CombatRow>
          {board.playerA.ranged.cards.map(c => <Card>{c.points}</Card>)}
        </CombatRow>
        <Score>{board.playerA.ranged.score}</Score>
      </Row>
      <Row>
        <RowName>Siege</RowName>
        <CombatRow>
          {board.playerA.siege.cards.map(c => <Card>{c.points}</Card>)}
        </CombatRow>
        <Score>{board.playerA.siege.score}</Score>
      </Row>
    </div>
    <div>
      <Row>
        <RowName>Close</RowName>
        <CombatRow>
          {board.playerB.close.cards.map(c => <Card>{c.points}</Card>)}
        </CombatRow>
        <Score>{board.playerB.close.score}</Score>
      </Row>
      <Row>
        <RowName>Ranged</RowName>
        <CombatRow>
          {board.playerB.ranged.cards.map(c => <Card>{c.points}</Card>)}
        </CombatRow>
        <Score>{board.playerB.ranged.score}</Score>
      </Row>
      <Row>
        <RowName>Siege</RowName>
        <CombatRow>
          {board.playerB.siege.cards.map(c => <Card>{c.points}</Card>)}
        </CombatRow>
        <Score>{board.playerB.siege.score}</Score>
      </Row>
    </div>
  </div>
));
