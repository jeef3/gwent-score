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

  const raw = cards.reduce((p, card) => p + card.points, 0);
  let net = raw;

  // Weather
  const bitingFrost = state.cards.find(card => card.special === 'biting-frost');
  if (bitingFrost) {
    net = cards.length;
  }

  // Commander
  const commander = state.cards.find(card => card.special === 'commander-horn');
  if (commander) {
    return net * 2;
  }

  return net;
};
