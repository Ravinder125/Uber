const { model } = require('mongoose');
const userModel = require('../models/user.model');

module.exports.createUser = async (email, username, fullname, password) => {
    try {
        if (!username || !fullname || !password || !email) {
            throw new res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = await userModel.create({
            username,
            fullName: {
                firstName: fullname.firstname,
                middleName: fullname?.middlename || '',
                lastName: fullname.lastname
            },
            password,
            email
        });

        return newUser;
    } catch (error) {
        throw error;
    }
}


