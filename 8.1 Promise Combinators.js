'use strict';
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
// 3 other promise combinators
// : Race
// : AllSettled
// : Any

// Promise.race
// The first settled promise wins the race in this.
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/portugal`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

//   Promise.allSettled
// It takes in an array of promises and it will simply retunr an array of all the settled promises.
// No matter if the promises got rejected or not
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

// Promise.any [ES 2021]
// It takes in an array of promises and this one wll return the first fulfilled promise and rejected promises are ignored
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
