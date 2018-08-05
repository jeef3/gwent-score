import { sum, calcScore } from './score';

export default (cards, { player, combat } = {}) => {
  const targetCards = calcScore(cards)
    .filter(card => (combat ? card.combat === combat : true))
    .filter(card => (player ? card.player === player : true));

  if ((player || combat) && sum(targetCards) < 10) {
    return cards;
  }

  const eligible = targetCards.filter(card => !card.hero);

  const highestScore = eligible.reduce(
    (p, card) => (card.score > p ? card.score : p),
    0
  );

  const idsToScorch = eligible
    .filter(card => !card.hero)
    .filter(card => card.score === highestScore)
    .map(card => card.id);

  return cards.map(
    card =>
      idsToScorch.indexOf(card.id) === -1 ? card : { ...card, scorched: true }
  );
};
