const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require('../controllers/user.contoller');

// search npm express validator

// express validator is used to check the data which is fetched from frontend is correct or not

router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').isLowercase().withMessage('Username must be in lowercase'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('lastname must be at least 3 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must at least 8 characters long')
],
    registerUser
)


module.exports = router;