// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const User = require('../models/user');

// const rideSchema = new Schema({
//     rider: {
//         type: Schema.Types.ObjectId,
//         ref: 'User', // Assuming you have a User model
//         required: true
//     },
//     driver: {
//         type: Schema.Types.ObjectId,
//         ref: 'Driver',
//         required: true
//     },
//     startLocation: {
//         type: [Number], // [longitude, latitude]
//         required: true
//     },
//     endLocation: {
//         type: [Number], // [longitude, latitude]
//         required: true
//     },
//     startTime: {
//         type: Date,
//         required: true
//     },
//     endTime: {
//         type: Date
//     },
//     fare: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['requested', 'in-progress', 'completed', 'cancelled'],
//         default: 'requested'
//     }
// });

// const Ride = mongoose.model('Ride', rideSchema);
// module.exports = Ride;


//          --------------------------------        ES6 --------------------------- 



import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    },
    pickupLocation: {
        type: [Number], 
        required: true
    },
    dropoffLocation: {
        type: [Number],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ride = mongoose.model('Ride', rideSchema);

export default Ride