const noop = card => card;

const prepScore = card =>
  card.scorched ? { ...card, score: 0 } : { ...card, score: card.points };

const resetToOne = card =>
  card.special || card.hero || card.scorched || card.score === 0
    ? card
    : {
        ...card,
        score: 1
      };

const boostMorale = (p, card, i, cards) => {
  if (card.scorched) {
    return p.concat({ ...card });
  }

  let boostCount = cards
    .filter(c => !c.scorched)
    .filter(c => c.attr === 'morale-boost').length;

  if (card.attr === 'morale-boost') {
    boostCount -= 1;
  }

  if (card.hero) {
    boostCount = 0;
  }

  return p.concat({ ...card, score: card.score + boostCount });
};

const tightlyBond = (p, card, i, cards) => {
  if (card.attr !== 'tight-bond' || card.scorched) {
    return p.concat(card);
  }

  const bondId = card.link;
  const tightlyBoundCount = cards
    .filter(c => !c.scorched)
    .filter(c => c.attr === 'tight-bond' && c.link === bondId).length;

  return p.concat({ ...card, score: card.score * tightlyBoundCount });
};

const blowCommanderHorn = (p, card, i, cards) => {
  if (
    card.hero ||
    card.scorched ||
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
      .filter(c => !c.scorched)
      .filter(c => c !== card)
      .filter(
        c => c.special === 'commander-horn' || c.attr === 'commander-horn'
      ).length === 0
  ) {
    return p.concat(card);
  }

  return p.concat({ ...card, score: card.score * 2 });
};

export const calcScore = cards => {
  const hasWeather = !!cards.find(card => card.special === 'weather');

  return cards
    .map(prepScore)
    .map(hasWeather ? resetToOne : noop)
    .reduce(tightlyBond, [])
    .reduce(boostMorale, [])
    .reduce(blowCommanderHorn, []);
};

export const sum = cards => cards.reduce((p, card) => p + (card.score || 0), 0);
