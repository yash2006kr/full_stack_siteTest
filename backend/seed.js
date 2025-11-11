const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Sample users data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123'
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    password: 'password123'
  },
  {
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    password: 'password123'
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    password: 'password123'
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-auth');
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('\nMake sure MongoDB is running or check your MONGO_URI in .env file');
    process.exit(1);
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users (optional - comment out if you want to keep existing data)
    console.log('Clearing existing users...');
    await User.deleteMany({});
    console.log('Existing users cleared');

    // Hash passwords and create users
    console.log('Creating sample users...');
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          name: user.name,
          email: user.email,
          password: hashedPassword
        };
      })
    );

    // Insert users into database
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✓ Successfully seeded ${createdUsers.length} users`);

    // Display created users
    console.log('\nSeeded users:');
    createdUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Password: ${sampleUsers[index].password}`);
    });

    console.log('\nSeeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();

