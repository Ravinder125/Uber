const userModel = require('../models/user.model');

module.exports.createUser = async (username, fullName, password,) => {
    try {
        const newUser = await userModel.create({ username, fullName, password });
        return newUser;
    } catch (error) {
        throw error;
    }
}