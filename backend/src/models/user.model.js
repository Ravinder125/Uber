const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    fullName: {

        firstName: {
            type: String,
            required: [true, "Firstname is required"],
            minlength: [3, "First name must be at least 3 characters long"]
        },
        middleName: {
            type: String,
            minlength: [3, "Middle name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "Lastname must be at least 5 characters long"]
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be atleast 8 characters long"],
        maxlength: [50, "Password cannot exceed above 50 characters"],
        select: false
    },
    socketId: {
        type: String, // Socket will be used to track live location and share it to captain
    }
}, { timestamps: true })


/* Now let's create custom methods to userschema to hash password before saving, comparing while login, and to create tokens */

// Hash password before saving 
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next()

    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()

    } catch (error) {
        next(error)
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    if (!this.password || !password) throw new Error('Hashed password or password is missing')

    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresin: process.env.JWT_EXPIRY })
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports.userModel = mongoose.model("User", userSchema)
