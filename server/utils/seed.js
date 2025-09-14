const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FAQ = require('../models/FAQ');

dotenv.config();

const seedData = [
  {
    question: 'What are college timings?',
    answer: 'College runs from 9 AM to 4 PM, Monday to Friday.',
    tags: ['timings', 'schedule']
  },
  {
    question: 'How to apply for an ID card?',
    answer: 'Fill the ID card form in the admin office.',
    tags: ['id', 'identity card']
  },
  {
    question: 'Who is the HOD of Computer Science?',
    answer: 'Dr. A. Sharma is the HOD of CSE department.',
    tags: ['hod', 'cs']
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await FAQ.deleteMany();
  await FAQ.insertMany(seedData);
  console.log('Database seeded');
  process.exit();
}

seed();