const { asyncHandler } = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized request' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'Unauthorized request' });

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }
});

module.exports.authCaptain = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized request' });

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized request' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) return res.status(401).json({ message: 'Unauthorized request' });
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }
});
