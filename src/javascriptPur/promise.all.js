// article interesting : https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c

const timeoutLOL = async (t) => {
  return new Promise((resolve) => {
    setTimeout(resolve, t, 'lol');
  });
};

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = () => new Promise((resolve, reject) => {
  resolve(timeoutLOL(2000));
});
const promise4 = async () => {
  await timeoutLOL(3000);
};

const test = async () => {
  console.time('TIME')
  Promise.all([promise1, promise2, promise3(), promise4()]).then((values) => {
    console.timeEnd('TIME');
    console.log('values :', values);
  });
};

test();
