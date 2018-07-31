export default cards => {
  const eligible = cards.filter(card => !card.hero);
  const highestScore = eligible.reduce(
    (p, card) => (card.score > p ? card.score : p),
    0
  );

  return eligible.filter(card => card.score === highestScore);
};
