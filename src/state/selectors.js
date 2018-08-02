import { calcScore, sum } from '../score';

export const getPlayerAClose = state =>
  state.cards.filter(card => card.player === 'a' && card.combat === 'close');

export const getPlayerBClose = state =>
  state.cards.filter(card => card.player === 'b' && card.combat === 'close');

export const getPlayerACloseScore = state => {
  const cards = state.cards
    .filter(card => card.player === 'a')
    .filter(card => card.combat === 'close')
    .filter(card => !card.special)
    .filter(card => !card.hero);

  return sum(calcScore(cards));
};

const isVisible = card => card.points !== null && card.points !== undefined;

export const getFullBoard = state => {
  const playerACards = state.cards.filter(c => c.player === 'a' || !c.player);
  const playerBCards = state.cards.filter(c => c.player === 'b' || !c.player);

  const playerACloseCards = calcScore(
    playerACards.filter(c => c.combat === 'close')
  );
  const playerARangedCards = calcScore(
    playerACards.filter(c => c.combat === 'ranged')
  );
  const playerASiegeCards = calcScore(
    playerACards.filter(c => c.combat === 'siege')
  );

  const playerBCloseCards = calcScore(
    playerBCards.filter(c => c.combat === 'close')
  );
  const playerBRangedCards = calcScore(
    playerBCards.filter(c => c.combat === 'ranged')
  );
  const playerBSiegeCards = calcScore(
    playerBCards.filter(c => c.combat === 'siege')
  );

  return {
    playerA: {
      close: {
        cards: playerACloseCards.filter(isVisible),
        score: sum(playerACloseCards)
      },
      ranged: {
        cards: playerARangedCards.filter(isVisible),
        score: sum(playerARangedCards)
      },
      siege: {
        cards: playerASiegeCards.filter(isVisible),
        score: sum(playerASiegeCards)
      }
    },
    playerB: {
      close: {
        cards: playerBCloseCards.filter(isVisible),
        score: sum(playerBCloseCards)
      },
      ranged: {
        cards: playerBRangedCards.filter(isVisible),
        score: sum(playerBRangedCards)
      },
      siege: {
        cards: playerBSiegeCards.filter(isVisible),
        score: sum(playerBSiegeCards)
      }
    }
  };
};

export const getPlayerAScore = state => {
  const { playerA } = getFullBoard(state);

  return playerA.close.score + playerA.ranged.score + playerA.siege.score;
};

export const getPlayerBScore = state => {
  const { playerB } = getFullBoard(state);

  return playerB.close.score + playerB.ranged.score + playerB.siege.score;
};

export const getActiveWeather = state =>
  state.cards.filter(card => card.special === 'weather');

export const getScores = state => ({
  playerA: {
    name: state.players.playerA.name,
    score: getPlayerAScore(state)
  },
  playerB: {
    name: state.players.playerB.name,
    score: getPlayerBScore(state)
  }
});
