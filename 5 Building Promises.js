'use strict';

// Promises are a special kind of object in javascript
const lotteryPromise = new Promise(function (resolve, reject) {
  // this function is the executor function which will be called by promise constructor as soon as it runs.
  //    And the function that we specified above is the
  // function which will contain the asynchronous behavior that we are trying to handle with promise
  console.log('Lottery Draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // calling this resolve function like this will mark this
      //  promise as a fulfilled or a resolved promise.
      // Whatever value we pass into the resolve function is gonna be the result of the promise
      // that will be available in the then handler.
      resolve('You Win 🎊🎊');
    } else {
      //  Into the reject function we pass in the error message, that we later want to be able
      // in the catch handler, so in the catch method.
      reject(new Error('You Lost your money 😭😭')); //created an error object with new Error
    }
  }, 2000);
});

// Most of the time we consume promises.
//  Usually promises are built only to wrap old callback based functions into promises and
// this is a process called as promisifying
// ** Promisifying means to convert callback based asynchronous behavior to promise based.

// Consuming promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying the setTimeout function and create a wait function
const wait = function (seconds) {
  // it is impossible for timer to fail so we use only resolve
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

//   Creating a fulfilled or a rejected promise immediately
Promise.resolve('abcd').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
