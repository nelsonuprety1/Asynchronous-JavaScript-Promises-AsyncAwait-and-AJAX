'use strict';

// Another way to consume promise Async Await
// Start by creating a special kind of function which is an async function

/*
This function now is an asynchronous function. So a function that will basically
keep running in the background while performing the code that 
is inside of it.
Then when this function is done, it automatically returns a promise.

Inside an async function we can have one or more await statements
*/
const whereAmI = async function (country) {
  // In an async function like this ,we can use await keyword to basically
  // await for the result of this below promise👇
  // So await will stop the code execution at this point of the function until
  // the promise is fulfilled.
  //   So until the data has been fetched in this case
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  //   As soon as this promise 👆 here is resolved then the value of this whole
  // await expression that we have here is going to be the resolved value of the
  // promise.
  const data = await res.json();
  console.log(data);
};

whereAmI('nepal');
console.log('FIrst');

/*
So await will stop the code execution at this point of the function until
  the promise is fulfilled.
    So until the data has been fetched in this case
 * const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
*Isn't stopping the code blocking the execution?
--> No, in this case, because stopping execution in an async function
is not a problem because this function is running asnchronously in the background.
And therefore it is not blocking the main thread of execution.
So its not blocking the call stack.
Thats what special about async await. So its the fact that it makes our code
look like regular synchronous code while behind the scenes, Everything is
in fact asynchronous.

*/
