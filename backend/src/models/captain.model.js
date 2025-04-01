/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const captainSchema = new Schema(
    {
        fullName: {
            firstName: {
                type: String,
                required: [true, 'First name is required'],
                trim: true,
                minlength: [3, 'First name must be at least 3 characters long'],
            },
            middleName: {
                type: String,
                trim: true,
            },
            lastName: {
                type: String,
                required: [true, 'Last name is required'],
                trim: true,
                minlength: [3, 'Last name must be at least 3 characters long'],
            },
        },
        telCode: {
            type: String,
            required: true,
            minlength: [1, 'Phone code must be at least 1 character long'],
            maxlength: [3, 'Phone code must not exceed 3 characters'],
        },
        tel: {
            type: String,
            required: true,
            minlength: [10, 'Phone number must be at least 10 characters long'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false,
        },
        socketId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
            index: true,
        },
        vehicle: {
            color: {
                type: String,
                required: [true, 'Vehicle color is required'],
                trim: true,
                minlength: [3, 'Color must be at least 3 characters long'],
            },
            plate: {
                type: String,
                required: [true, 'Vehicle plate is required'],
                trim: true,
                minlength: [3, 'Plate number must be at least 3 characters long'],
            },
            capacity: {
                type: Number,
                required: [true, 'Vehicle capacity is required'],
                min: [1, 'Vehicle capacity must be at least 1'],
            },
            vehicleType: {
                type: String,
                enum: ['car', 'bike', 'van', 'auto'],
                required: [true, 'Vehicle type is required'],
            },
        },
        location: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    { timestamps: true }
);

// Hash password before saving
captainSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Method to compare passwords
captainSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY } // Default expiry if not set
    );
};

module.exports = mongoose.model('Captain', captainSchema);
