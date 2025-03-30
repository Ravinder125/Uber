const userModel = require('../models/user.model');

module.exports.createUser = async (email, username, telCode, tel, fullname, password) => {
    try {

        if (!email || !username || !telCode || !tel || !password || !fullname?.firstname || !fullname?.lastname) {
            throw new Error('All fields are required');
        }

        const newUser = await userModel.create({
            username,
            fullName: {
                firstName: fullname.firstname,
                middleName: fullname?.middlename || '',
                lastName: fullname.lastname
            },
            telCode,
            tel,
            password,
            email
        });

        return newUser;
    } catch (error) {
        throw error;
    }
}


