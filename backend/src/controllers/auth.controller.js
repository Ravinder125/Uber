const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');


module.exports.isLoggedin = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log('User at backend:', user);
    // if (!user) {
    //     console.log('User at backend:', user);
    //     return res.status(401).json(ApiResponse.error(401, 'Unauthorized', 'Unauthorized'));
    // }
    res.status(200).json(ApiResponse.success(200, user, 'User is logged in'));
})