const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.autharization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    req.user = user;
    return next();

})