import { calcScore } from './score';

export default (cards, combat) => {
  const eligible = calcScore(cards)
    .filter(card => (combat ? card.combat === combat : true))
    .filter(card => !card.hero);

  const highestScore = eligible.reduce(
    (p, card) => (card.score > p ? card.score : p),
    0
  );

  const idsToScorch = eligible
    .filter(card => card.score === highestScore)
    .map(card => card.id);

  return cards.map(
    card =>
      idsToScorch.indexOf(card.id) === -1 ? card : { ...card, scorched: true }
  );
};
