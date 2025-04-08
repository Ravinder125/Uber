const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/is-user-logged-in', authMiddleware.authUser, authController.isUserLoggedin);
router.get('/is-captain-logged-in', authMiddleware.authCaptain, authController.isCaptainLoggedin)

module.exports = router;