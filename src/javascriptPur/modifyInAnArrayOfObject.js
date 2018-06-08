// Objectives: update the second object of the array

const array = [{
  field: 1,
  field2: 2
}, {
  field: 10,
  field2: 20
}]

const index = array.findIndex(element => element.field === 10);

array[index] = {
  ...array[index],
  field2: 35
}

console.log('array[index] :', array[index]);