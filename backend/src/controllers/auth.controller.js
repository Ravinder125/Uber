const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');


const isLoggedin = (userType) => asyncHandler(async (req, res) => {
    const user = req[userType];
    console.log('User at backend:',);

    res.status(200).json(ApiResponse.success(200, userType, 'User is logged in'));
})


module.exports = {
    isUserLoggedin: isLoggedin('user'),
    isCaptainLoggedin: isLoggedin('captain')
}