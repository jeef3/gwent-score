import scorch from './scorch';

it('should scorch the highest non-hero cards', () => {
  expect(
    scorch([
      { id: 1, points: 0 },
      { id: 2, points: 5 },
      { id: 3, points: 5 },
      { id: 4, points: 15, hero: true }
    ])
  ).toEqual([
    { id: 1, points: 0 },
    { id: 2, points: 5, scorched: true },
    { id: 3, points: 5, scorched: true },
    { id: 4, points: 15, hero: true }
  ]);
});

it('should apply score modifier first', () => {
  expect(
    scorch([
      { id: 1, points: 0 },
      { id: 2, points: 8, attr: 'tight-bond' },
      { id: 3, points: 10 },
      { id: 4, points: 8, attr: 'tight-bond' },
      { id: 5, points: 15, hero: true },
      { id: 6, points: 8, attr: 'tight-bond' }
    ])
  ).toEqual([
    { id: 1, points: 0 },
    { id: 2, points: 8, attr: 'tight-bond', scorched: true },
    { id: 3, points: 10 },
    { id: 4, points: 8, attr: 'tight-bond', scorched: true },
    { id: 5, points: 15, hero: true },
    { id: 6, points: 8, attr: 'tight-bond', scorched: true }
  ]);
});

it('should target a specific combat', () => {
  expect(
    scorch(
      [
        { id: 1, points: 5, combat: 'close' },
        { id: 2, points: 4, combat: 'close' },
        { id: 3, points: 5, combat: 'ranged' },
        { id: 4, points: 4, combat: 'ranged' },
        { id: 5, points: 5, combat: 'siege' },
        { id: 6, points: 4, combat: 'siege' }
      ],
      'ranged'
    )
  ).toEqual([
    { id: 1, points: 5, combat: 'close' },
    { id: 2, points: 4, combat: 'close' },
    { id: 3, points: 5, combat: 'ranged', scorched: true },
    { id: 4, points: 4, combat: 'ranged' },
    { id: 5, points: 5, combat: 'siege' },
    { id: 6, points: 4, combat: 'siege' }
  ]);
});
