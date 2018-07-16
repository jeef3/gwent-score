import score from '../score';

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

  return score(cards);
};

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
        cards: playerACloseCards,
        score: score(playerACloseCards)
      },
      ranged: {
        cards: playerARangedCards,
        score: score(playerARangedCards)
      },
      siege: {
        cards: playerASiegeCards,
        score: score(playerASiegeCards)
      }
    },
    playerB: {
      close: {
        cards: playerBCloseCards,
        score: score(playerBCloseCards)
      },
      ranged: {
        cards: playerBRangedCards,
        score: score(playerBRangedCards)
      },
      siege: {
        cards: playerBSiegeCards,
        score: score(playerBSiegeCards)
      }
    }
  };
};
