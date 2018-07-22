import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Actions, Selector } from '../state';
import woodTexture from '../assets/cherry4.jpg';
import CombatRowBackground from './molecules/CombatRowBackground';
import Plus from './atoms/icons/Plus';
import Card from './Card';

const Container = styled.div`
  background-image: url(${woodTexture});
  background-size: cover;
  background-repeat: no-repeat;
`;
Container.displayName = 'Container';

const Row = styled.div`
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0) 5%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 0.7)
  );

  display: grid;
  grid-template-columns: 1fr 50px 50px;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    'name score add'
    'cards cards cards';
`;
Row.displayName = 'Row';

const RowName = styled.h2`
  padding: 0 10px;
  margin: 0;

  color: white;
  font-size: 16px;
  font-weight: 600;

  grid-area: name;
  align-self: center;
`;
RowName.displayName = 'RowName';

const CombatRow = styled.div`
  position: relative;
  min-height: 70px;
  padding: 0 8px;

  display: flex;
  flex-wrap: wrap;

  grid-area: cards;
`;
CombatRow.displayName = 'CombatRow';

const Add = styled.button`
  padding: 13px;

  cursor: pointer;
  color: white;

  border: 0;

  background: transparent;

  grid-area: add;
`;
Add.displayName = 'Add';

const Score = styled.h2`
  align-self: center;

  margin: 0;

  color: white;
  font-family: 'Gwent', sans-serif;
  font-size: 24;

  text-align: center;

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
    <Container>
      <div>
        <Row>
          <RowName>Siege</RowName>
          <CombatRow>
            <CombatRowBackground combat="siege" />
            {board.playerA.siege.cards.map(c => (
              <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
            ))}
          </CombatRow>
          <Add onClick={playerA.onPlaySiege}>
            <Plus />
          </Add>
          <Score>{board.playerA.siege.score}</Score>
        </Row>
        <Row>
          <RowName>Ranged</RowName>
          <CombatRow>
            <CombatRowBackground combat="ranged" />
            {board.playerA.ranged.cards.map(c => (
              <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
            ))}
          </CombatRow>
          <Add onClick={playerA.onPlayRanged}>
            <Plus />
          </Add>
          <Score>{board.playerA.ranged.score}</Score>
        </Row>
        <Row>
          <RowName>Close</RowName>
          <CombatRow>
            <CombatRowBackground combat="close" />
            {board.playerA.close.cards.map(c => (
              <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
            ))}
          </CombatRow>
          <Add onClick={playerA.onPlayClose}>
            <Plus />
          </Add>
          <Score style={{ gridArea: 'score' }}>
            {board.playerA.close.score}
          </Score>
        </Row>
      </div>
      <hr />
      <div>
        <Row>
          <RowName>Close</RowName>
          <CombatRow>
            <CombatRowBackground combat="close" />
            {board.playerB.close.cards.map(c => (
              <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
            ))}
          </CombatRow>
          <Add onClick={playerB.onPlayClose}>
            <Plus />
          </Add>
          <Score>{board.playerB.close.score}</Score>
        </Row>
        <Row>
          <RowName>Ranged</RowName>
          <CombatRow>
            <CombatRowBackground combat="ranged" />
            {board.playerB.ranged.cards.map(c => (
              <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
            ))}
          </CombatRow>
          <Add onClick={playerB.onPlayRanged}>
            <Plus />
          </Add>
          <Score>{board.playerB.ranged.score}</Score>
        </Row>
        <Row>
          <RowName>Siege</RowName>
          <CombatRow>
            <CombatRowBackground combat="siege" />
            {board.playerB.siege.cards.map(c => (
              <Card key={c.id} {...c} onClick={() => onCardClick(c)} />
            ))}
          </CombatRow>
          <Add onClick={playerB.onPlaySiege}>
            <Plus />
          </Add>
          <Score>{board.playerB.siege.score}</Score>
        </Row>
      </div>
    </Container>
  </Scroller>
));
