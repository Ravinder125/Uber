const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    fullName: {

        firstName: {
            type: String,
            required: [true, "Firstname is required"],
            minlength: [3, "First name must be at least 3 characters long"],
            trim: true,
        },
        middleName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            minlength: [3, "Lastname must be at least 5 characters long"],
            required: [true, "Lastname is required"],
            trim: true,
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        index: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be atleast 8 characters long"],
        maxlength: [50, "Password cannot exceed above 50 characters"],
        select: false,
        trim: true,
    },
    socketId: {
        type: String, // Socket will be used to track live location and share it to captain
    }
}, { timestamps: true })


/* Now let's create custom methods to userschema to hash password before saving, comparing while login, and to create tokens */

// Hash password before saving 

// Yes, it is possible to access the password here. The select: false property in your schema means that the password field is not included by default when querying the database. 
// However, within the context of a Mongoose middleware function (like the one you have), you can still access the password field directly.
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
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema)
