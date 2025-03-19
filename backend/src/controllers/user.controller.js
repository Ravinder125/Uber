const userModel = require('../models/user.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');
const { createUser } = require('../services/user.service');
const { ApiResponse } = require('../utils/ApiResponse');
const blacklistTokenModel = require('../models/blacklistToken.model');

const generateAuthToken = async (userId) => {
    const user = await userModel.findById(userId);
    const token = await user.generateAuthToken();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    };
    return { options, token }
};

module.exports.registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors.array().map(error => error.msg)
        });
    }

    const { username, email, fullname, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await createUser(email, username, fullname, password);
    if (!user) return res.status(500).json({ message: 'User not created' });

    const { options, token } = await generateAuthToken(user._id);
    return res.status(201)
        .cookie('token', token, options)
        .json(new ApiResponse(201, { user: user, token: token }, 'User created successfully'))
});

module.exports.loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ message: 'Validation Error', errors: errors.array().map(error => error.msg) });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await userModel.findOne({ email });
    if (!user || !await user.isPasswordCorrect(password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { options, token } = await generateAuthToken(user._id);
    return res.status(201)
        .cookie('token', token, options)
        .json(new ApiResponse(201, { user: user, token: token }, 'User logged in successfully'))

});

module.exports.userProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, { user: req.user }, 'User profile fetched successfully'));
});

module.exports.logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    const blacklistToken = await blacklistTokenModel.create({ token });
    return res.clearCookie('token').json(new ApiResponse(200, { blacklistToken }, 'User logged out successfully'));
});
