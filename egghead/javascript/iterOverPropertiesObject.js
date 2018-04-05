const { difference } = require('../../lodashUtils');

const player = {
  name: 'Hugo',
  surname: 'John'
};

const player2 = {
  name: 'TOTO',
  surname: 'John',
  cheese: true
}

const entries = Object.entries(player);

console.log('entries :', entries); // entries : [ [ 'name', 'Hugo' ], [ 'surname', 'John' ] ]

for (let entry in entries) {
  console.log('entry :', entry); // entry : 0  // entry : 1
}

for (let [key, obj] of entries) {
  console.log('key :', key); // key : name // key : surname
  console.log('obj :', obj); // obj : Hugo // obj : John
}


console.log('Object.keys(player) :', Object.keys(player)); // [ 'name', 'surname' ]
console.log('Object.keys(player2) :', Object.keys(player2)); // [ 'name', 'cheese' ]

console.log(difference(Object.keys(player2), Object.keys(player))); // [ 'age' ]