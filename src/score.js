const noop = card => card;

const resetToOne = card =>
  card.special || card.hero || card.points === 0
    ? card
    : {
        ...card,
        points: 1
      };

const boostMorale = (p, card, i, cards) => {
  let boostCount = cards.filter(c => c.attr === 'morale-boost').length;

  if (card.attr === 'morale-boost') {
    boostCount -= 1;
  }

  if (card.hero) {
    boostCount = 0;
  }

  return p.concat({ ...card, points: card.points + boostCount });
};

const tightlyBond = (p, card, i, cards) => {
  if (card.attr !== 'tight-bond') {
    return p.concat(card);
  }

  const bondId = card.link;
  const tightlyBoundCount = cards.filter(
    c => c.attr === 'tight-bond' && c.link === bondId
  ).length;

  return p.concat({ ...card, points: card.points * tightlyBoundCount });
};

const blowCommanderHorn = (p, card, i, cards) => {
  if (
    card.hero ||
    cards.filter(
      c => c.special === 'commander-horn' || c.attr === 'commander-horn'
    ).length === 0
  ) {
    return p.concat(card);
  }

  // Only double Dandelion, if there's a real Commander Horn present.
  if (
    card.attr === 'commander-horn' &&
    cards
      .filter(c => c !== card)
      .filter(
        c => c.special === 'commander-horn' || c.attr === 'commander-horn'
      ).length === 0
  ) {
    return p.concat(card);
  }

  return p.concat({ ...card, points: card.points * 2 });
};

export default cards => {
  const hasWeather = !!cards.find(card => card.special === 'weather');

  return cards
    .map(hasWeather ? resetToOne : noop)
    .reduce(boostMorale, [])
    .reduce(tightlyBond, [])
    .reduce(blowCommanderHorn, [])
    .reduce((p, card) => p + (card.points || 0), 0);
};
