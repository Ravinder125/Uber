const captainModel = require('../models/captain.model')
const userModel = require('../models/user.model')

module.exports.createAuthTokenForUser = async (userType, userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) return { error: `${userType} not found` };

        const token = await user.generateAuthToken();

        const options = {
            httpOnly: true,
            secure: true,
        };

        return { options, token };
    } catch (error) {
        return { error: error.message };
    }
};


module.exports.createAuthTokenForCaptain = async (userType, userId) => {
    try {
        const captain = await captainModel.findById(userId);
        if (!captain) return { error: `${userType} not found` };
        const token = await captain.generateAuthToken();

        const options = {
            httpOnly: true,
            secure: true,
        };

        return { options, token };
    } catch (error) {
        return { error: error.message };
    }
};


