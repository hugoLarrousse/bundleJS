//value max/min in an array of object

const users = [{
  key: 22,
},
{
  key: 33
},
{
  key: 10
}, {
  key: 21
},
{
  wrongKey: 45,
}
]


const min = Math.min(...users.map(user2 => user2.key || Infinity)); // 10

//Infinity is important iof you are not sure that the key exist in every object
