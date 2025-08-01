const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // trim: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        // trim: true,
        // lowercase: true,
    },
    password: {
        type: String,
        // required: true,
        // minlength: 6,
        // select: false
    }
});

module.exports = mongoose.model('User', userSchema);