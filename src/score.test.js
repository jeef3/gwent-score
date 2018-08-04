import { calcScore, sum } from './score';

it('should calc simple score', () => {
  expect(sum(calcScore([{ points: 5 }, { points: 5 }]))).toBe(10);
});

it('should ignore scorched cards', () => {
  const cards = calcScore([
    { points: 5 },
    { points: 5 },
    { points: 5, scorched: true }
  ]);

  expect(cards.length).toBe(3);
  expect(sum(cards)).toBe(10);
});

it('should double score with Commander Horn', () => {
  const cards = calcScore([
    { points: 5 },
    { points: 5 },
    { special: 'commander-horn' }
  ]);

  expect(cards[0].points).toBe(5);
  expect(cards[0].score).toBe(10);
  expect(cards[1].points).toBe(5);
  expect(cards[1].score).toBe(10);
  expect(sum(cards)).toBe(20);
});

it('should not double heroes when Commander Horn is used', () => {
  const cards = calcScore([
    { points: 5 },
    { points: 5 },
    { points: 10, hero: true },
    { special: 'commander-horn' }
  ]);

  expect(cards[0].points).toBe(5);
  expect(cards[0].score).toBe(10);
  expect(cards[1].points).toBe(5);
  expect(cards[1].score).toBe(10);
  expect(cards[2].points).toBe(10);
  expect(cards[2].score).toBe(10);
  expect(sum(cards)).toBe(30);
});

it('should not let Dandelion double himself', () => {
  const cards = calcScore([
    { points: 2, attr: 'commander-horn' },
    { points: 5 },
    { points: 5 },
    { points: 10, hero: true }
  ]);

  expect(cards[1].points).toBe(5);
  expect(cards[1].score).toBe(10);

  expect(sum(cards)).toBe(32);
});

it('should handle multiple Dandelions', () => {
  const cards = calcScore([
    { points: 2, attr: 'commander-horn' },
    { points: 2, attr: 'commander-horn' },
    { points: 5 },
    { points: 5 },
    { points: 10, hero: true }
  ]);

  expect(sum(cards)).toBe(38);
});

it('should not double double if Dandelion is used with Commander Horn', () => {
  const cards = calcScore([
    { points: 2, attr: 'commander-horn' },
    { points: 5 },
    { points: 5 },
    { points: 10, hero: true },
    { special: 'commander-horn' }
  ]);

  expect(cards[0].points).toBe(2);
  expect(cards[0].score).toBe(4);

  expect(sum(cards)).toBe(34);
});

it('should double linked Tight Bond', () => {
  const cards = calcScore([
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' }
  ]);
  expect(sum(cards)).toBe(20);
});

it('should triple linked Tight Bond', () => {
  const cards = calcScore([
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' }
  ]);
  expect(sum(cards)).toBe(45);
});

it('should limit double/triple linked Tight Bond to the linked ones', () => {
  const cards = calcScore([
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f2' },
    { points: 5, attr: 'tight-bond', link: 'f2' }
  ]);
  expect(sum(cards)).toBe(40);
});

it('should double Tight Bond if Commander Horn is present', () => {
  const cards = calcScore([
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f2' },
    { points: 5, attr: 'tight-bond', link: 'f2' },
    { points: 5, attr: 'tight-bond', link: 'f2' },
    { special: 'commander-horn' }
  ]);

  expect(sum(cards)).toBe(130);
});

it('should reset points to 1 when weather is applied', () => {
  const cards = calcScore([
    { points: 5 },
    { points: 5 },
    { points: 5 },
    { special: 'weather' }
  ]);

  expect(sum(cards)).toBe(3);
});

it('should leave 0 pointers when weather is applied', () => {
  const cards = calcScore([
    { points: 0 },
    { points: 5 },
    { points: 5 },
    { points: 5 },
    { special: 'weather' }
  ]);
  expect(sum(cards)).toBe(3);
});

it('should apply weather first when Commander Horn is present', () => {
  const cards = calcScore([
    { points: 5 },
    { points: 5 },
    { points: 5 },
    { special: 'commander-horn' },
    { special: 'weather' }
  ]);
  expect(sum(cards)).toBe(6);
});

it('should +1 for Morale Boost', () => {
  const cards = calcScore([
    { points: 6 },
    { points: 6 },
    { points: 6 },
    { points: 1, attr: 'morale-boost' }
  ]);

  expect(sum(cards)).toBe(22);
});

it('should not boost heroes', () => {
  const cards = calcScore([
    { points: 6 },
    { points: 6 },
    { points: 6 },
    { points: 10, hero: true },
    { points: 1, attr: 'morale-boost' }
  ]);
  expect(sum(cards)).toBe(32);
});

it('should +1 n times when n Morale Boosters used', () => {
  const cards = calcScore([
    { points: 6 },
    { points: 6 },
    { points: 6 },
    { points: 10, hero: true },
    { points: 1, attr: 'morale-boost' },
    { points: 1, attr: 'morale-boost' },
    { points: 1, attr: 'morale-boost' }
  ]);
  expect(sum(cards)).toBe(46);
});

it('should double boosted score when Commander Horn is used with Morale Booster', () => {
  const cards = calcScore([
    { points: 6 },
    { points: 6 },
    { points: 6 },
    { points: 10, hero: true },
    { points: 1, attr: 'morale-boost' },
    { points: 1, attr: 'morale-boost' },
    { points: 1, attr: 'morale-boost' },
    { special: 'commander-horn' }
  ]);

  expect(cards[0].points).toBe(6);
  expect(cards[0].score).toBe(18);

  expect(cards[3].points).toBe(10);
  expect(cards[3].score).toBe(10);

  expect(cards[4].points).toBe(1);
  expect(cards[4].score).toBe(6);

  expect(sum(cards)).toBe(82);
});

it('should handle all the things', () => {
  const cards = calcScore([
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },

    { points: 2, attr: 'tight-bond', link: 'f2' },
    { points: 2, attr: 'tight-bond', link: 'f2' },
    { points: 2, attr: 'tight-bond', link: 'f2' },

    { points: 1, attr: 'morale-boost' },
    { points: 1, attr: 'morale-boost' },

    { points: 15, hero: true },

    { points: 2, attr: 'commander-horn' },

    { special: 'commander-horn' }
  ]);

  expect(cards[0].points).toBe(5);
  expect(cards[0].score).toBe(34);
  expect(cards[1].points).toBe(5);
  expect(cards[1].score).toBe(34);
  expect(cards[2].points).toBe(5);
  expect(cards[2].score).toBe(34);
  expect(sum(cards.slice(0, 3))).toBe(102);

  expect(cards[3].points).toBe(2);
  expect(cards[3].score).toBe(16);
  expect(cards[4].points).toBe(2);
  expect(cards[4].score).toBe(16);
  expect(cards[5].points).toBe(2);
  expect(cards[5].score).toBe(16);
  expect(sum(cards.slice(3, 6))).toBe(48);

  expect(cards[6].points).toBe(1);
  expect(cards[6].score).toBe(4);
  expect(cards[7].points).toBe(1);
  expect(cards[7].score).toBe(4);
  expect(sum(cards.slice(6, 8))).toBe(8);

  expect(cards[8].points).toBe(15);
  expect(cards[8].score).toBe(15);

  expect(cards[9].points).toBe(2);
  expect(cards[9].score).toBe(8);

  expect(sum(cards)).toBe(181);
});

it('should handle all the things in bad weather', () => {
  const cards = calcScore([
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },
    { points: 5, attr: 'tight-bond', link: 'f1' },

    { points: 2, attr: 'tight-bond', link: 'f2' },
    { points: 2, attr: 'tight-bond', link: 'f2' },
    { points: 2, attr: 'tight-bond', link: 'f2' },

    { points: 1, attr: 'morale-boost' },
    { points: 1, attr: 'morale-boost' },

    { points: 15, hero: true },

    { points: 2, attr: 'commander-horn' },

    { special: 'commander-horn' },

    { special: 'weather' }
  ]);

  expect(cards[0].points).toBe(5);
  expect(cards[0].score).toBe(10);
  expect(cards[1].points).toBe(5);
  expect(cards[1].score).toBe(10);
  expect(cards[2].points).toBe(5);
  expect(cards[2].score).toBe(10);
  expect(sum(cards.slice(0, 3))).toBe(30);

  expect(cards[3].points).toBe(2);
  expect(cards[3].score).toBe(10);
  expect(cards[4].points).toBe(2);
  expect(cards[4].score).toBe(10);
  expect(cards[5].points).toBe(2);
  expect(cards[5].score).toBe(10);
  expect(sum(cards.slice(3, 6))).toBe(30);

  expect(cards[6].points).toBe(1);
  expect(cards[6].score).toBe(4);
  expect(cards[7].points).toBe(1);
  expect(cards[7].score).toBe(4);
  expect(sum(cards.slice(6, 8))).toBe(8);

  expect(cards[8].points).toBe(15);
  expect(cards[8].score).toBe(15);

  expect(cards[9].points).toBe(2);
  expect(cards[9].score).toBe(6);

  expect(sum(cards)).toBe(89);
});
