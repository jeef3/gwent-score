export const getPlayerAClose = state =>
  state.playerA.close.map(id => state.cards[id]);

export const getPlayerBClose = state =>
  state.playerB.close.map(id => state.cards[id]);
