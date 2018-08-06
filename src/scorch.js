import { sum, calcScore } from './score';

const getRowFns = (cards, player, combat) => {
  if (player && combat) {
    return [c => c.player === player && c.combat === combat];
  }
  if (!player && combat) {
    return [
      c => c.player === 'a' && c.combat === combat,
      c => c.player === 'b' && c.combat === combat
    ];
  }
  if (player && !combat) {
    return [
      c => c.player === player && c.combat === 'siege',
      c => c.player === player && c.combat === 'ranged',
      c => c.player === player && c.combat === 'close'
    ];
  }
  return [
    c => c.player === 'a' && c.combat === 'siege',
    c => c.player === 'a' && c.combat === 'ranged',
    c => c.player === 'a' && c.combat === 'close',
    c => c.player === 'b' && c.combat === 'close',
    c => c.player === 'b' && c.combat === 'ranged',
    c => c.player === 'b' && c.combat === 'siege'
  ];
};

const highestScoreReducer = (p, card) =>
  !card.hero && card.score > p ? card.score : p;

export default (cards, { player, combat } = {}) => {
  let calcdRows = getRowFns(cards, player, combat).map(fn =>
    calcScore(cards.filter(fn))
  );

  if (combat) {
    calcdRows = calcdRows.filter(row => sum(row) >= 10);
  }

  const highestScore = calcdRows
    .map(row => row.reduce(highestScoreReducer, 0))
    .reduce((p, rowScore) => (rowScore > p ? rowScore : p), 0);

  const idsToScorch = calcdRows.reduce(
    (p, row) =>
      p.concat(
        row.filter(c => !c.hero && c.score === highestScore).map(c => c.id)
      ),
    []
  );

  return cards.map(
    card =>
      idsToScorch.indexOf(card.id) === -1 ? card : { ...card, scorched: true }
  );
};
