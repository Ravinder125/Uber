const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { validationResult } = require('express-validator');
const { createCaptain } = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

const generateAuthToken = async (captainId) => {
    const captain = await captainModel.findById(captainId);
    if (!captain) return { error: 'Captain not found' }

    const token = await captain.generateAuthToken();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
    };

    return { options, token };
};

module.exports.registerCaptain = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.error(400, errors.array().map(err => err.msg), 'Validation error'));
    }

    const { fullname, email, password, telCode, tel, status, vehicle, location } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json(ApiResponse.error(400, 'Captain already exists', 'Captain already exists'));
    }

    const newCaptain = await createCaptain(fullname, email, password, telCode, tel, status, vehicle, location);

    const { options, token, error } = await generateAuthToken(newCaptain._id);
    if (error) return res.status(500).json(ApiResponse.error(500, 'Token generation failed', 'Internal server error'))

    return res.status(201)
        .cookie('token', token, options)
        .json(ApiResponse.success(201, { newCaptain, token }, 'Captain successfully created'));
});

module.exports.loginCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.error(400, errors.array().map(err => err.msg), 'Validation error'));
    }

    const { email, tel, password } = req.body;
    if (!password) {
        return res.status(400).json(ApiResponse.error(400, 'Email and password fields are required'));
    }
    if (!tel && !email) return res.status(400).json(ApiResponse.error(400, 'Phone number or email is required', 'Phone number or email is required'));

    const captain = await captainModel.findOne({ $or: [{ email }, { tel }] }).select('+password');
    console.log(captain)
    if (!captain || !(await captain.isPasswordCorrect(password))) {
        return res.status(400).json(ApiResponse.error(400, 'Invalid email or password', 'Invalid email or password'));
    }

    const { options, token } = await generateAuthToken(captain._id);
    return res.status(200)
        .cookie('token', token, options)
        .json(ApiResponse.success(200, { captain, token }, 'Captain successfully logged in'));
});

module.exports.logoutCaptain = asyncHandler(async (req, res) => {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return res.status(400).json(ApiResponse.error(400, 'No token provided', 'No token provided'));
    }

    await blacklistTokenModel.create({ token });

    return res.status(200)
        .clearCookie('token')
        .json(ApiResponse.success(200, { logout: true }, 'Captain successfully logged out'));
});

module.exports.captainProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(ApiResponse.success(200, { captain: req.captain }, 'Captain profile fetched successfully'));
});
