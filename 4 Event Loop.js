'use strict';
console.log('Test Start');
setTimeout(() => console.log('O second timer'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));

// We cant do high precision task with javascript timer because its not so reliable

Promise.resolve('Resolved Promise 2').then(res => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});

console.log('Test end');
// Microtask has priority over callback que so Promise resolve will be executed first
