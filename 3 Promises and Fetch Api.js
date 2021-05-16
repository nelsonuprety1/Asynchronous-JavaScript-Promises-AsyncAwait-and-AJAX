'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
   <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};
/* 
* Promise: A promise is an object that may produce a single value
 some time in the future : 
either a resolved value, or a reason that it's not resolved (e.g., a network error occurred)
*/

// ** Old way
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

/*
 * Fetch API
The Fetch API is a promise-based JavaScript API for making asynchronous HTTP requests 
 in the browser similar to XMLHttpRequest (XHR). 
 Unlike XHR, it is a simple and clean API that uses promises to provides 
 a more powerful and flexible feature set to fetch resources from the server 
 */

// ** New Way
const request = fetch('https://restcountries.eu/rest/v2/name/nepal');
// console.log(request);

// Consuming promise
const getCountryData = function (country) {
  // calling a fetch function like this will immediately return the promise
  //   In the beginning the promise is still pending because the
  //asynchronous task of getting the data is still running in the background
  //   The fetch here will return the promise and on all the promises we can apply the then method
  //   Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //   handling the promise using then method
    .then(response => response.json())
    //  to read the data from the response we need to call the json method on that response object
    // this json function is also an asynchronous function. It will also return a new promise

    // since above is a promise we can again call the then method
    // .then(function (data) {
    //   renderCountry(data[0]);
    //   const neighbour = data[0].borders[0];
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //   Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    // catch also returns a promise
    .catch(err => {
      console.error(`${err} 🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('nepal');
});

getCountryData('weird');
