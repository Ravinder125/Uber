const express = require('express')
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('fullname.firstname')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 character long'),
    body('tel')
        .isLength({ min: 10, max: 13 }).withMessage('Phone must be only 10 digits long'),
    body('status')
        .isIn(["active", "inactive"]).withMessage('Status should be either active or inactive'),
    body('vehicle.color')
        .isLength({ min: 3 }).withMessage('Color mus be at least 3 characters long'),
    body('vehicle.plate')
        .isLength({ min: 3 }).withMessage('Plate number must be 3 characters long'),
    body('vehicle.capacity')
        .isNumeric().withMessage('Capacity must be a number')
        .isLength({ min: 1 }).withMessage('capacity must be at least 1 sit'),
    body('vehicle.type')
        .isIn(["car", "bike", "van", "auto"]).withMessage('Vehicle type must be car, bike, van or auto')
],
    captainController.registerCaptain
)
router.post('/login', [
    body('email')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be at least 8 characters long')
],
    captainController.loginCaptain
)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)
router.get('/profile', authMiddleware.authCaptain, captainController.captainProfile)

module.exports = router
