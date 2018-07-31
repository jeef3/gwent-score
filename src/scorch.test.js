import scorch from './scorch';

it('should choose all the highest non-hero card', () => {
  expect(
    scorch([
      { points: 0, score: 1 },
      { points: 8, score: 18 },
      { points: 5, score: 10 },
      { points: 8, score: 18 },
      { points: 15, score: 15, hero: true },
      { points: 8, score: 18 }
    ])
  ).toEqual([
    { points: 8, score: 18 },
    { points: 8, score: 18 },
    { points: 8, score: 18 }
  ]);
});
