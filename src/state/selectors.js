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
