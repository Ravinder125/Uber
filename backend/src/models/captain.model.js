// Suppress CommonJS module warning
/* eslint-disable @typescript-eslint/no-var-requires */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [3, 'First name must be atleast 3 characters long']
        },
        middleName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [3, 'First name must be atleast 3 characters long']
        },
    },
    tel: {
        type: String,
        required: true,
        minlength: [10, 'Phone number must be at least 10 characters long'],
        unique: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        unique: true,
        index: true,
        trim: true,
        lowercase: [true, 'Email must be in lowercase']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be atleast 8 characters long'],
        select: false
    },
    sockectId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: 'inactive',
        index: true,
    },
    vehicle: {
        color: {
            type: String,
            required: [true, 'Vehicle color is required'],
            trim: true,
            minlength: [3, 'color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: [true, 'Vehicle plate is required'],
            trim: true,
            minlength: [3, 'Plate number must be 3 characters long']
        },
        capacity: {
            type: Number,
            required: [true, 'Vehicle capacity is required'],
            min: [1, 'Vehicle capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            enum: ["car", "bike", "van", "auto"],
            required: [true, 'Vehicle type is required']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
}, { timestamps: true });

captainSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

captainSchema.methods.isPasswordCorrect = async function (password) {
    const user = await this.constructor.findById(this._id).select('+password')
    return await bcrypt.compare(password, user.password);
}

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
}

module.exports = mongoose.model('Captain', captainSchema);
