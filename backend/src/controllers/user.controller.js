const userModel = require('../models/user.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');
const { createUser } = require('../services/user.service');
const { ApiResponse } = require('../utils/ApiResponse');
const blacklistTokenModel = require('../models/blacklistToken.model');

const generateAuthToken = async (userId) => {
    const user = await userModel.findById(userId);
    if (!user) return { error: "User not found" }

    const token = await user.generateAuthToken();
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    };

    return { options, token };
};

module.exports.registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.error(400, errors.array().map(error => error.msg), "Validation error"));
    }

    const { email, username, telCode, tel, fullname, password } = req.body;
    console.log('User data:', req.body);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json(ApiResponse.error(400, 'User already exist', 'User already exists'));

    const user = await createUser(email, username, telCode, tel, fullname, password);

    if (!user) return res.
        status(500)
        .json(ApiResponse.error(500, 'Error occured while creating creating user', "Internal server error"));

    const { options, token, error } = await generateAuthToken(user._id);

    if (error) return res.status(500).json(ApiResponse.error(500, error, "Token generation failed", 'Internal server error'))

    return res
        .status(201)
        .cookie('token', token, options)
        .json(ApiResponse.success(201, { user: user, token }, 'User created successfully'));
});

module.exports.loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.error(400, errors.array().map(error => error.msg), 'Validation Error'));
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(ApiResponse.error(400, 'Email and password are required', 'Email and password are required'));
    }

    const user = await userModel.findOne({ email })
    if (!user || !await user.isPasswordCorrect(password)) {
        return res.status(401).json(ApiResponse.error(401, 'Invalid email or password', 'Invalid email or password'));
    }

    const { options, token, error } = await generateAuthToken(user._id);
    if (error) return res.status(500).json(ApiResponse.error(500, 'Token generation failed', 'Internal server error'))

    return res
        .status(200)
        .cookie('token', token, options)
        .json(ApiResponse.success(200, { user, token }, 'User logged in successfully'));
});

module.exports.logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.token || req.headers?.authorization.split(' ')[1]
    if (!token) {
        return res.status(400).json(ApiResponse.error(400, 'No token provided', 'No token provided'));
    }

    await blacklistTokenModel.create({ token });

    return res.clearCookie('token').json(ApiResponse.success(200, { logout: true }, 'User logged out successfully'));
});

module.exports.userProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(ApiResponse.success(200, { user: req.user }, 'User profile fetched successfully'));
});

