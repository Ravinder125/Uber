const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// search npm express validator

// express validator is used to check the data which is fetched from frontend is correct or not

router.post('/register', [
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isLowercase().withMessage('Username must be in lowercase'),
    body('email')
        .isEmail().withMessage('Invalid Email'),
    body('fullname.firstname')
        .trim()
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
],
    userController.registerUser
);

router.post('/login', [
    body('email')
        .isEmail().withMessage('Invalid Email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.userProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
