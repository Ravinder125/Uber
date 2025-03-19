const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { validationResult } = require('express-validator');
const { createCaptain } = require('../services/capatain.service');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

const generateAuthToken = async (captainId, res) => {
    const captain = await captainModel.findById(captainId);
    const token = await captain.generateAuthToken();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    };

    return { options, token }
};

module.exports.registerCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400)
            .json({ message: 'Validation error', error: errors.array().map(err => err.msg) });
    }
    const { fullname, email, password, phone, status, vehicle, location } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) return res.status(400).json({ message: 'Captain already exists' });
    const newCaptain = await createCaptain(fullname, email, password, phone, status, vehicle, location);

    const { options, token } = await generateAuthToken(newCaptain._id);
    return res.status(200)
        .cookie('token', token, options)
        .json(new ApiResponse(200, { newCaptain, token }, 'Captain successfully created'));
});

module.exports.loginCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400)
            .json({ message: 'Validation Error', errors: errors.array().map(err => err.msg) });
    }
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password fields are required' });

    const captain = await captainModel.findOne({ email });
    if (!captain || !await captain.isPasswordCorrect(password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const { options, token } = await generateAuthToken(captain._id);
    return res.status(200)
        .cookie('token', token, options)
        .json(new ApiResponse(200, { captain, token }, 'Captain successfully logged in'));
});

module.exports.logoutCaptain = asyncHandler(async (req, res) => {
    const token = req.cookies.token || req.headers?.authorization.split(' ')[1];
    console.log(token);
    const blacklistToken = await blacklistTokenModel.create({ token });
    return res.status(200).clearCookie('token').json(new ApiResponse(200, { blacklistToken }, "Captain succesfully logged out"));
});

module.exports.captainProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, { captain: req.captain }, "Captain profile fetched successfully"))
})