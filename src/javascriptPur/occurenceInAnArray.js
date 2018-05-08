

const peopleArray = [
  {
      "age": 33,
      "hobby": "games"
  },
  {
      "age": 28,
      "hobby": "chess"
  },
  {
      "age": 21,
      "hobby": "ninjitsu"
  },
  {
      "age": 21,
      "hobby": "games"
  },
  {
      "age": 21,
      "hobby": "kick the can"
  }
];

const accumulatedTotals = peopleArray.reduce(
  (totals, p) => ({ ...totals, [p.hobby]: (totals[p.hobby] || 0) + 1 }),
  {}
)

console.log('accumulatedTotals :', accumulatedTotals); // accumulatedTotals : { games: 2, chess: 1, ninjitsu: 1, 'kick the can': 1 }