import React from 'react';
// import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import styled from 'styled-components';

// import { Actions, Selector } from '../state';
import woodTexture from '../assets/cherry4.jpg';
import WEATHER_CARDS from '../weatherCards';
import CombatRowBackground from './molecules/CombatRowBackground';
import SpecialIcon from './atoms/SpecialIcon';
import Plus from './atoms/icons/Plus';
import Card from './Card';

const Container = styled.div`
  min-height: 100%;

  background-image: url(${woodTexture});
  background-size: cover;
  background-repeat: no-repeat;

  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas: 'playerA', 'weather', 'playerB';
`;
Container.displayName = 'Container';

const Row = styled.div`
  position: relative;

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
  grid-template-areas: 'cards score add' 'cards unset unset';
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

  display: none;
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
  color: rgba(255, 255, 255, 0.3);

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

const PlayerBoard = styled.div`
  display: grid;
`;
PlayerBoard.displayName = 'PlayerBoard';

const WeatherCards = styled.div`
  box-sizing: border-box;
  height: 60px;

  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0) 5%
    ),
    rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;
`;
WeatherCards.displayName = 'WeatherCards';

const WeatherCard = styled.div`
  width: 40px;
  height: 40px;

  color: white;

  border-radius: 20px;

  background: rgba(255, 255, 255, 0.1);
`;
WeatherCard.displayName = 'WeatherCard';

// export default connect(
//   state => ({
//     board: Selector.getFullBoard(state),
//     weather: Selector.getActiveWeather(state)
//   }),
//   dispatch => ({
//     onCardClick: card => dispatch(Actions.editUnit({ card })),
//     playerA: {
//       onPlaySiege: () =>
//         dispatch(Actions.playUnit({ card: { player: 'a', combat: 'siege' } })),
//       onPlayRanged: () =>
//         dispatch(Actions.playUnit({ card: { player: 'a', combat: 'ranged' } })),
//       onPlayClose: () =>
//         dispatch(Actions.playUnit({ card: { player: 'a', combat: 'close' } }))
//     },
//     playerB: {
//       onPlayClose: () =>
//         dispatch(Actions.playUnit({ card: { player: 'b', combat: 'close' } })),
//       onPlayRanged: () =>
//         dispatch(Actions.playUnit({ card: { player: 'b', combat: 'ranged' } })),
//       onPlaySiege: () =>
//         dispatch(Actions.playUnit({ card: { player: 'b', combat: 'siege' } }))
//     }
//   })
// )(({ board, weather, onCardClick, playerA, playerB }) => (
const Board = inject('app', 'board', 'players')(
  ({ app, board, players: { playerA, playerB } }) => (
    <Scroller>
      <Container>
        <PlayerBoard>
          <Row>
            <CombatRowBackground combat="siege" />
            <RowName>Siege</RowName>
            <CombatRow>
              {board.fullBoard.playerA.siege.cards.map(c => (
                <Card key={c.id} {...c} onClick={() => app.showUnitDialog(c)} />
              ))}
            </CombatRow>
            <Add
              onClick={() =>
                app.showUnitDialog({ player: 'a', combat: 'siege' })
              }
            >
              <Plus />
            </Add>
            <Score>{board.fullBoard.playerA.siege.score}</Score>
          </Row>
          <Row>
            <CombatRowBackground combat="ranged" />
            <RowName>Ranged</RowName>
            <CombatRow>
              {board.fullBoard.playerA.ranged.cards.map(c => (
                <Card key={c.id} {...c} onClick={() => app.showUnitDialog(c)} />
              ))}
            </CombatRow>
            <Add onClick={playerA.onPlayRanged}>
              <Plus />
            </Add>
            <Score>{board.fullBoard.playerA.ranged.score}</Score>
          </Row>
          <Row>
            <CombatRowBackground combat="close" />
            <RowName>Close</RowName>
            <CombatRow>
              {board.fullBoard.playerA.close.cards.map(c => (
                <Card key={c.id} {...c} onClick={() => app.showUnitDialog(c)} />
              ))}
            </CombatRow>
            <Add onClick={playerA.onPlayClose}>
              <Plus />
            </Add>
            <Score style={{ gridArea: 'score' }}>
              {board.fullBoard.playerA.close.score}
            </Score>
          </Row>
        </PlayerBoard>

        <WeatherCards>
          {board.activeWeather.map(card => (
            <WeatherCard key={card.id}>
              <SpecialIcon
                name={WEATHER_CARDS.find(c => c.combat === card.combat).name}
              />
            </WeatherCard>
          ))}
        </WeatherCards>
        <PlayerBoard>
          <Row>
            <CombatRowBackground combat="close" />
            <RowName>Close</RowName>
            <CombatRow>
              {board.fullBoard.playerB.close.cards.map(c => (
                <Card key={c.id} {...c} onClick={() => app.showUnitDialog(c)} />
              ))}
            </CombatRow>
            <Add onClick={playerB.onPlayClose}>
              <Plus />
            </Add>
            <Score>{board.fullBoard.playerB.close.score}</Score>
          </Row>
          <Row>
            <CombatRowBackground combat="ranged" />
            <RowName>Ranged</RowName>
            <CombatRow>
              {board.fullBoard.playerB.ranged.cards.map(c => (
                <Card key={c.id} {...c} onClick={() => app.showUnitDialog(c)} />
              ))}
            </CombatRow>
            <Add onClick={playerB.onPlayRanged}>
              <Plus />
            </Add>
            <Score>{board.fullBoard.playerB.ranged.score}</Score>
          </Row>
          <Row>
            <CombatRowBackground combat="siege" />
            <RowName>Siege</RowName>
            <CombatRow>
              {board.fullBoard.playerB.siege.cards.map(c => (
                <Card key={c.id} {...c} onClick={() => app.showUnitDialog(c)} />
              ))}
            </CombatRow>
            <Add onClick={playerB.onPlaySiege}>
              <Plus />
            </Add>
            <Score>{board.fullBoard.playerB.siege.score}</Score>
          </Row>
        </PlayerBoard>
      </Container>
    </Scroller>
  )
);

export default Board;
