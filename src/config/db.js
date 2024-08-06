// const mongoose = require("mongoose");

// function connectDb() {
//     mongoose.connect("mongodb://localhost:27017/omcabs", {});

//     const connection = mongoose.connection;

//     connection.on('open', () => {
//         console.log('MongoDB connected successfully');
//     });

//     connection.on('error', (err) => {
//         console.error('MongoDB connection error:', err);
//     });
// }

// connectDb();

// module.exports = mongoose;



import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDb;
