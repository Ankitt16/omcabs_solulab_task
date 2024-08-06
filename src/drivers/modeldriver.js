// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const driverSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     phone: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     carModel: {
//         type: String,
//         required: true
//     },
//     carNumber: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     location: {
//         type: [Number],
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['available', 'unavailable'],
//         default: 'available'
//     }
// });

// const Driver = mongoose.model('Driver', driverSchema);
// module.exports = Driver;

import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    }
});

driverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
