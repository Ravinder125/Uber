const userModel = require("../models/user.model")
const { asyncHandler } = require("../utils/asyncHandler")
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service")
const { ApiError } = require("../utils/apiError");
const { ApiResponse } = require("../utils/apiResponse")


module.exports.registerUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return next(new ApiError(400, "Validation Error", errors.array().map((error) => error.msg).join(",")));
        return res.status(400).json(errors.array().map((error) => error.msg));
    }
    const { username, email, fullname, password } = req.body;
    return res.status(201).json(new ApiResponse(201, { user: { username, email, fullname, password } }, "User created successfully"));

})

