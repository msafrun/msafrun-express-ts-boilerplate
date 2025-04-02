import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Role from '../apis/global/auth/auth.model';
import User from '../apis/global/user/user.model';

dotenv.config();
const mongoURI = process.env.MONGO_URI!;

// Load JSON file safely
const loadJSON = (filename: string) => {
  const filePath = path.join(__dirname, `./${filename}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    throw new Error(`Error parsing JSON file: ${filePath}`);
  }
};

// Function to seed roles
const seedRoles = async () => {
  console.log('Seeding roles...');
  const roles = loadJSON('roles');

  await Role.deleteMany({});
  const createdRoles = await Role.insertMany(roles);

  console.log(`${createdRoles.length} roles seeded.`);

  return createdRoles.reduce(
    (acc, role) => {
      acc[role.name] = role._id; // Map role name to ObjectId
      return acc;
    },
    {} as Record<string, mongoose.Types.ObjectId>,
  );
};

// Function to seed users
const seedUsers = async (roleMap: Record<string, mongoose.Types.ObjectId>) => {
  console.log('Seeding users...');
  const users = loadJSON('users');

  await User.deleteMany({});

  for (const user of users) {
    const userInstance = new User({
      ...user,
      role: roleMap[user.role] || null, // Convert role name to ObjectId
    });

    await userInstance.save(); // Hashes password before saving
  }

  console.log(`${users.length} users seeded.`);
};

// Main function
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Seed roles first and get role mapping
    const roleMap = await seedRoles();

    // Seed users using role mapping
    await seedUsers(roleMap);

    console.log('Seeding completed successfully.');
  } catch (error: any) {
    console.error('Seeding failed:', error.message);
  } finally {
    console.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedDatabase();
