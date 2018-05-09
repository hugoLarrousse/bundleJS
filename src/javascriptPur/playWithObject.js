const obj = {
  test1: 1,
  test2: 2,
  test3: 3,
  test4: 4,
};

const { test2, test4, ...rest } = obj;

console.log(rest); //{ test1: 1, test3: 3 }