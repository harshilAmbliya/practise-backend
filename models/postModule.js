const mongoose = require('mongoose');
const User = require('./userModel');

// Post Schema with reference to User
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true,
    },
}, {
    timestamps: true,
});




module.exports = mongoose.model('Posts', postSchema);