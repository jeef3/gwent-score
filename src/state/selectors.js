export const getPlayerAClose = state =>
  state.cards.filter(card => card.player === 'a' && card.combat === 'close');

export const getPlayerBClose = state =>
  state.cards.filter(card => card.player === 'b' && card.combat === 'close');
