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

  const playerACloseCards = playerACards.filter(c => c.combat === 'close');
  const playerARangedCards = playerACards.filter(c => c.combat === 'ranged');
  const playerASiegeCards = playerACards.filter(c => c.combat === 'siege');

  const playerBCloseCards = playerBCards.filter(c => c.combat === 'close');
  const playerBRangedCards = playerBCards.filter(c => c.combat === 'ranged');
  const playerBSiegeCards = playerBCards.filter(c => c.combat === 'siege');

  return {
    playerA: {
      close: {
        cards: playerACloseCards.filter(isVisible),
        score: sum(calcScore(playerACloseCards))
      },
      ranged: {
        cards: playerARangedCards.filter(isVisible),
        score: sum(calcScore(playerARangedCards))
      },
      siege: {
        cards: playerASiegeCards.filter(isVisible),
        score: sum(calcScore(playerASiegeCards))
      }
    },
    playerB: {
      close: {
        cards: playerBCloseCards.filter(isVisible),
        score: sum(calcScore(playerBCloseCards))
      },
      ranged: {
        cards: playerBRangedCards.filter(isVisible),
        score: sum(calcScore(playerBRangedCards))
      },
      siege: {
        cards: playerBSiegeCards.filter(isVisible),
        score: sum(calcScore(playerBSiegeCards))
      }
    }
  };
};

export const getPlayerAScore = state => {
  const playerACards = state.cards.filter(c => c.player === 'a' || !c.player);

  return sum(calcScore(playerACards));
};

export const getPlayerBScore = state => {
  const playerBCards = state.cards.filter(c => c.player === 'b' || !c.player);

  return sum(calcScore(playerBCards));
};
