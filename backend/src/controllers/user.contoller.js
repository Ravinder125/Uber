const userModel = require("../models/user.model")
const { asyncHandler } = require("../utils/asyncHandler")
const { validationResult } = require("express-validator");
const { createUser, getUser } = require("../services/user.service")
const { ApiError } = require("../utils/ApiError")
const { ApiResponse } = require("../utils/ApiResponse")


module.exports.registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ message: "Validation Error", errors: errors.array().map(error => error.msg) });
    }
    const { username, email, fullname, password } = req.body;

    const existingUser = await getUser(email);
    if (existingUser.length) return res.status(400).json("User already exists");

    const options = {
        httpOnly: true,
        sameSit: "None",

        
    }
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
        options.sameSit = "Strict";
        options.domain = process.env.DOMAIN;
        // options.expires = new Date(Date.now() + process.env.COOKIE_EXPIRY);
    }
    const user = await createUser(email, username, fullname, password);
    if (!user) throw new ApiError(500, "User not created");

    const token = await user.generateAuthToken();
    return res
        .status(201)
        .cookie("token", token, options)
        .json(new ApiResponse(201, { user: user }, "User created successfully"));
})

