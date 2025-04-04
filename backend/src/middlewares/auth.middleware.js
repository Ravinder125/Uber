const { asyncHandler } = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { ApiResponse } = require('../utils/ApiResponse');

const UNAUTHORIZED_RESPONSE = ApiResponse.error(401, 'Unauthorized request', 'Unauthorized request');
const authMiddleware = (model, userType) => asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json(UNAUTHORIZED_RESPONSE)
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) return res.status(401).json(UNAUTHORIZED_RESPONSE)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await model.findById(decoded._id);
        if (!user) return res.status(401).json(UNAUTHORIZED_RESPONSE)

        req[userType] = user;
        return next();
    } catch (error) {
        return res.status(401).json(UNAUTHORIZED_RESPONSE)
    }
});

module.exports = {
    authUser: authMiddleware(userModel, "user"),
    authCaptain: authMiddleware(captainModel, "captain")
}
