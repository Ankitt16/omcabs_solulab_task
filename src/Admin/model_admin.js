// const mongoose = require("mongoose");
// const { Schema } = mongoose;


// const adminSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         default: 'admin'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Admin = mongoose.model('Admin', adminSchema);
// module.exports = Admin;

import mongoose from 'mongoose';
import Joi from 'joi';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model('Admin', adminSchema);

function validateAdmin(admin) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(13).required(),
        role: Joi.string().valid('admin', 'superadmin')
    });
    return schema.validate(admin);
}

export { Admin, validateAdmin };
