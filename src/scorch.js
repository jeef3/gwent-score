import { calcScore } from './score';

export default (cards, { player, combat } = {}) => {
  const highestScoreReducer = (p, card) =>
    !card.hero && card.score > p ? card.score : p;

  const calcdRows = (player && combat
    ? [c => c.player === player && c.combat === combat]
    : [
        c => c.player === 'a' && c.combat === 'siege',
        c => c.player === 'a' && c.combat === 'ranged',
        c => c.player === 'a' && c.combat === 'close',
        c => c.player === 'b' && c.combat === 'close',
        c => c.player === 'b' && c.combat === 'ranged',
        c => c.player === 'b' && c.combat === 'siege'
      ]
  ).map(fn => calcScore(cards.filter(fn)));

  const highestScore = calcdRows
    .map(row => row.reduce(highestScoreReducer, 0))
    .reduce((p, rowScore) => (rowScore > p ? rowScore : p), 0);

  const idsToScorch = calcdRows.reduce(
    (p, row) =>
      p.concat(row.filter(c => c.score === highestScore).map(c => c.id)),
    []
  );

  console.log('score:', highestScore, 'scorch', idsToScorch);

  return cards.map(
    card =>
      idsToScorch.indexOf(card.id) === -1 ? card : { ...card, scorched: true }
  );
};
