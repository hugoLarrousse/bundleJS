const toot = [1,2,3,4,5]

for (const t of toot ) {
  if (t === 2) {
    continue;
  }
  console.log('t :', t); // t: 1, t: 3, t: 4 ...
}