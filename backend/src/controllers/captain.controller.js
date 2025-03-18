const userModel = require('../models/captain.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { validationResult } = require('express-validator');
const { createCaptain } = require('../services/capatain.service');
const captainModel = require('../models/captain.model');

module.exports.registerCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400)
            .json({ message: 'Validation error', error: errors.array().map(err => err.msg) });
    }
    const { fullname, email, password, phone, status, vehicle, location } = req.body;

    const existingCaptain = await captainModel.findOne({ email })
    if (existingCaptain) return res.status(400).json({ message: "User already exists" })
    const newCaptain = await createCaptain(fullname, email, password, phone, status, vehicle, location)
    return res.status(200)
        .json(new ApiResponse(200, newCaptain, 'Captain is successfully created'))
})
