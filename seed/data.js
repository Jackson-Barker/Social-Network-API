const username = [
  'Aaran2',
  'bob55',
  'dan77',
  'stan88',
  'karen3',
];

const email = [
  'aaran2@gmail.com',
  'bob55@gmail.com',
  'dan77@gmail.com',
  'stan88@gmail.com',
  'karen3@gmail.com',

]

const thoughtText = [
  'cool!',
  'Find My Phone',
  'Learn Piano',
  'Starbase Defender',
  'Tower Defense',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserName = () => username;

  const getRandomEmail = () => email; 

  const getRandomThought = () => thoughtText


// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomEmail, getRandomThought };
