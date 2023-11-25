require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/User'); // Update the path to your actual user model file
const Thought = require('./models/Thought'); // Update the path to your actual thought model file

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {

});

// Function to seed users, thoughts, and friendships
const seedDatabase = async () => {
  try {
    // Clear existing data from the database
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const user1 = new User({ username: 'user1', email: 'user1@example.com' });
    const user2 = new User({ username: 'user2', email: 'user2@example.com' });
    const user3 = new User({ username: 'user3', email: 'user3@example.com' });
    const user4 = new User({ username: 'user4', email: 'user4@example.com' });

    const thought1 = new Thought({ thoughtText: 'This is the thought of user1', username: 'user1' });
    const thought2 = new Thought({ thoughtText: 'This is the thought of user2', username: 'user2' });
    const thought3 = new Thought({ thoughtText: 'This is the thought of user3', username: 'user3' });
    const thought4 = new Thought({ thoughtText: 'This is the thought of user4', username: 'user4' });

    await Promise.all([
      thought1.save(),
      thought2.save(),
      thought3.save(),
      thought4.save(),
    ]);

    user1.thoughts.push(thought1._id);
    user2.thoughts.push(thought2._id);
    user3.thoughts.push(thought3._id);
    user4.thoughts.push(thought4._id);

    user1.friends = [user2._id];
    user2.friends = [user1._id, user3._id];
    user3.friends = [user2._id, user4._id];
    user4.friends = [user3._id];
    await Promise.all([user1.save(), user2.save(), user3.save(), user4.save()]);
    console.log('Database seeded successfully.');

    // Disconnect from the database after seeding
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

// Call the seedDatabase function to start the seeding process
seedDatabase();