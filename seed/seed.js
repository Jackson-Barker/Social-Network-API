const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUserName, getRandomEmail, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const usernames = [];
  const thoughts = [];
  // Get some random assignment objects using a helper function that we imported from ./data
  

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 5; i++) {
    const username = getRandomUserName()[i];
    const email = getRandomEmail()[i];
    const thoughtText = getRandomThought()[i];

    usernames.push({
      username,
      email
    });
    thoughts.push({
      thoughtText,
      username
    })
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(usernames);
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(usernames);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
