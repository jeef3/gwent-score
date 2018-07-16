import calc from './score';

it('should calc simple score', () => {
  expect(calc([{ points: 5 }, { points: 5 }])).toBe(10);
});

it('should double score with Commander Horn', () => {
  expect(
    calc([{ points: 5 }, { points: 5 }, { special: 'commander-horn' }])
  ).toBe(20);
});

it('should not double heroes when Commander Horn is used', () => {
  expect(
    calc([
      { points: 5 },
      { points: 5 },
      { points: 10, hero: true },
      { special: 'commander-horn' }
    ])
  ).toBe(30);
});

it('should not double Dandelion', () => {
  expect(
    calc([
      { points: 2, attr: 'commander-horn' },
      { points: 5 },
      { points: 5 },
      { points: 10, hero: true }
    ])
  ).toBe(32);
});

it('should handle multiple Dandelions', () => {
  expect(
    calc([
      { points: 2, attr: 'commander-horn' },
      { points: 2, attr: 'commander-horn' },
      { points: 5 },
      { points: 5 },
      { points: 10, hero: true }
    ])
  ).toBe(38);
});

it('should not double double if Dandelion is used with Commander Horn', () => {
  expect(
    calc([
      { points: 2, attr: 'commander-horn' },
      { points: 5 },
      { points: 5 },
      { points: 10, hero: true },
      { special: 'commander-horn' }
    ])
  ).toBe(34);
});

it('should double linked Tight Bond', () => {
  expect(
    calc([
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' }
    ])
  ).toBe(20);
});

it('should triple linked Tight Bond', () => {
  expect(
    calc([
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' }
    ])
  ).toBe(45);
});

it('should limit double/triple linked Tight Bond to the linked ones', () => {
  expect(
    calc([
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f2' },
      { points: 5, attr: 'tight-bond', link: 'f2' }
    ])
  ).toBe(40);
});

it('should double Tight Bond if Commander Horn is present', () => {
  expect(
    calc([
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f2' },
      { points: 5, attr: 'tight-bond', link: 'f2' },
      { points: 5, attr: 'tight-bond', link: 'f2' },
      { special: 'commander-horn' }
    ])
  ).toBe(130);
});

it('should reset points to 1 when weather is applied', () => {
  expect(
    calc([{ points: 5 }, { points: 5 }, { points: 5 }, { special: 'weather' }])
  ).toBe(3);
});

it('should leave 0 pointers when weather is applied', () => {
  expect(
    calc([
      { points: 0 },
      { points: 5 },
      { points: 5 },
      { points: 5 },
      { special: 'weather' }
    ])
  ).toBe(3);
});

it('should apply weather first when Commander Horn is present', () => {
  expect(
    calc([
      { points: 5 },
      { points: 5 },
      { points: 5 },
      { special: 'commander-horn' },
      { special: 'weather' }
    ])
  ).toBe(6);
});

it('should +1 for Morale Boost', () => {
  expect(
    calc([
      { points: 6 },
      { points: 6 },
      { points: 6 },
      { points: 1, attr: 'morale-boost' }
    ])
  ).toBe(22);
});

it('should not boost heroes', () => {
  expect(
    calc([
      { points: 6 },
      { points: 6 },
      { points: 6 },
      { points: 10, hero: true },
      { points: 1, attr: 'morale-boost' }
    ])
  ).toBe(32);
});

it('should +1 n times when n Morale Boosters used', () => {
  expect(
    calc([
      { points: 6 },
      { points: 6 },
      { points: 6 },
      { points: 10, hero: true },
      { points: 1, attr: 'morale-boost' },
      { points: 1, attr: 'morale-boost' },
      { points: 1, attr: 'morale-boost' }
    ])
  ).toBe(46);
});

it('should double boosted score when Commander Horn is used with Morale Booster', () => {
  expect(
    calc([
      { points: 6 },
      { points: 6 },
      { points: 6 },
      { points: 10, hero: true },
      { points: 1, attr: 'morale-boost' },
      { points: 1, attr: 'morale-boost' },
      { points: 1, attr: 'morale-boost' },
      { special: 'commander-horn' }
    ])
  ).toBe(82);
});

it('should handle all the things', () => {
  expect(
    calc([
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' }, // 45

      { points: 2, attr: 'tight-bond', link: 'f2' },
      { points: 2, attr: 'tight-bond', link: 'f2' },
      { points: 2, attr: 'tight-bond', link: 'f2' }, // 18

      { points: 1, attr: 'morale-boost' },
      { points: 1, attr: 'morale-boost' },

      // 69

      { points: 15, hero: true }, // 15

      { points: 2, attr: 'commander-horn' }, // 2

      { special: 'commander-horn' }
    ])
  ).toBe(172);
});

it('should handle all the things in bad weather', () => {
  expect(
    calc([
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' },
      { points: 5, attr: 'tight-bond', link: 'f1' }, // 9

      { points: 2, attr: 'tight-bond', link: 'f2' },
      { points: 2, attr: 'tight-bond', link: 'f2' },
      { points: 2, attr: 'tight-bond', link: 'f2' }, // 9

      { points: 1, attr: 'morale-boost' },
      { points: 1, attr: 'morale-boost' },

      // 30

      { points: 15, hero: true }, // 15

      { points: 2, attr: 'commander-horn' }, // 2

      { special: 'commander-horn' },

      { special: 'weather' }
    ])
  ).toBe(154);
});
