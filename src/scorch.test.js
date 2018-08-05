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
        { id: 3, points: 4, combat: 'close' },
        { id: 4, points: 5, combat: 'ranged' },
        { id: 5, points: 4, combat: 'ranged' },
        { id: 6, points: 4, combat: 'ranged' },
        { id: 7, points: 5, combat: 'siege' },
        { id: 8, points: 4, combat: 'siege' },
        { id: 9, points: 4, combat: 'siege' }
      ],
      { combat: 'ranged' }
    )
  ).toEqual([
    { id: 1, points: 5, combat: 'close' },
    { id: 2, points: 4, combat: 'close' },
    { id: 3, points: 4, combat: 'close' },
    { id: 4, points: 5, combat: 'ranged', scorched: true },
    { id: 5, points: 4, combat: 'ranged' },
    { id: 6, points: 4, combat: 'ranged' },
    { id: 7, points: 5, combat: 'siege' },
    { id: 8, points: 4, combat: 'siege' },
    { id: 9, points: 4, combat: 'siege' }
  ]);
});

it('should target a specific player', () => {
  expect(
    scorch(
      [
        { player: 'a', id: 1, points: 5, combat: 'close' },
        { player: 'a', id: 2, points: 4, combat: 'close' },
        { player: 'a', id: 3, points: 4, combat: 'close' },
        { player: 'b', id: 4, points: 5, combat: 'close' },
        { player: 'b', id: 5, points: 4, combat: 'close' },
        { player: 'b', id: 6, points: 4, combat: 'close' }
      ],
      { player: 'a' }
    )
  ).toEqual([
    { player: 'a', id: 1, points: 5, combat: 'close', scorched: true },
    { player: 'a', id: 2, points: 4, combat: 'close' },
    { player: 'a', id: 3, points: 4, combat: 'close' },
    { player: 'b', id: 4, points: 5, combat: 'close' },
    { player: 'b', id: 5, points: 4, combat: 'close' },
    { player: 'b', id: 6, points: 4, combat: 'close' }
  ]);
});

it('should target a specific player and combat', () => {
  expect(
    scorch(
      [
        { player: 'a', id: 1, points: 5, combat: 'close' },
        { player: 'a', id: 2, points: 4, combat: 'close' },
        { player: 'a', id: 3, points: 4, combat: 'close' },
        { player: 'a', id: 4, points: 5, combat: 'ranged' },
        { player: 'a', id: 19, points: 5, combat: 'ranged', hero: true },
        { player: 'a', id: 7, points: 5, combat: 'siege' },
        { player: 'a', id: 8, points: 4, combat: 'siege' },
        { player: 'a', id: 9, points: 4, combat: 'siege' },
        { player: 'b', id: 10, points: 5, combat: 'close' },
        { player: 'b', id: 11, points: 4, combat: 'close' },
        { player: 'b', id: 12, points: 4, combat: 'close' },
        { player: 'b', id: 13, points: 5, combat: 'ranged' },
        { player: 'b', id: 14, points: 4, combat: 'ranged' },
        { player: 'b', id: 15, points: 4, combat: 'ranged' },
        { player: 'b', id: 16, points: 5, combat: 'siege' },
        { player: 'b', id: 17, points: 4, combat: 'siege' },
        { player: 'b', id: 18, points: 4, combat: 'siege' }
      ],
      { player: 'a', combat: 'ranged' }
    )
  ).toEqual([
    { player: 'a', id: 1, points: 5, combat: 'close' },
    { player: 'a', id: 2, points: 4, combat: 'close' },
    { player: 'a', id: 3, points: 4, combat: 'close' },
    { player: 'a', id: 4, points: 5, combat: 'ranged', scorched: true },
    { player: 'a', id: 19, points: 5, combat: 'ranged', hero: true },
    { player: 'a', id: 7, points: 5, combat: 'siege' },
    { player: 'a', id: 8, points: 4, combat: 'siege' },
    { player: 'a', id: 9, points: 4, combat: 'siege' },
    { player: 'b', id: 10, points: 5, combat: 'close' },
    { player: 'b', id: 11, points: 4, combat: 'close' },
    { player: 'b', id: 12, points: 4, combat: 'close' },
    { player: 'b', id: 13, points: 5, combat: 'ranged' },
    { player: 'b', id: 14, points: 4, combat: 'ranged' },
    { player: 'b', id: 15, points: 4, combat: 'ranged' },
    { player: 'b', id: 16, points: 5, combat: 'siege' },
    { player: 'b', id: 17, points: 4, combat: 'siege' },
    { player: 'b', id: 18, points: 4, combat: 'siege' }
  ]);
});

it('should only scorch the targeted player/row if that row score is over 10', () => {
  expect(
    scorch(
      [
        { player: 'a', id: 1, points: 5, combat: 'close' },
        { player: 'a', id: 2, points: 4, combat: 'close' },
        { player: 'a', id: 3, points: 5, combat: 'ranged' },
        { player: 'a', id: 4, points: 4, combat: 'ranged' },
        { player: 'a', id: 5, points: 5, combat: 'siege' },
        { player: 'a', id: 6, points: 4, combat: 'siege' }
      ],
      { player: 'a', combat: 'close' }
    )
  ).toEqual([
    { player: 'a', id: 1, points: 5, combat: 'close' },
    { player: 'a', id: 2, points: 4, combat: 'close' },
    { player: 'a', id: 3, points: 5, combat: 'ranged' },
    { player: 'a', id: 4, points: 4, combat: 'ranged' },
    { player: 'a', id: 5, points: 5, combat: 'siege' },
    { player: 'a', id: 6, points: 4, combat: 'siege' }
  ]);
});
