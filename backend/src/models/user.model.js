const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        index: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        index: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
        trim: true,
    },
    socketId: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    if (!password) throw new Error('Password is required for comparison.');

    const user = await this.constructor.findById(this._id).select('+password');
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '7d' });
};

module.exports = mongoose.model('User', userSchema);