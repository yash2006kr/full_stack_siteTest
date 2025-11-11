const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('🔍 Checking Backend Setup...\n');

// Check .env file
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('   Create a .env file in the backend directory with:');
  console.log('   MONGO_URI=your_mongodb_connection_string');
  console.log('   JWT_SECRET=your_secret_key\n');
  process.exit(1);
} else {
  console.log('✅ .env file exists');
}

// Check environment variables
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri || mongoUri === 'your_mongodb_connection_string_here') {
  console.log('❌ MONGO_URI not set in .env file');
  console.log('   Please set your MongoDB connection string\n');
  process.exit(1);
} else {
  console.log('✅ MONGO_URI is set');
}

if (!jwtSecret || jwtSecret === 'your_secret_key_here_make_it_long_and_random') {
  console.log('⚠️  JWT_SECRET not set or using default value');
  console.log('   Consider setting a strong secret key in production\n');
} else {
  console.log('✅ JWT_SECRET is set');
}

// Check node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules not found!');
  console.log('   Run: npm install\n');
  process.exit(1);
} else {
  console.log('✅ Dependencies installed');
}

console.log('\n✅ Setup looks good! You can now run:');
console.log('   npm run seed  (to seed the database)');
console.log('   npm start     (to start the server)\n');

