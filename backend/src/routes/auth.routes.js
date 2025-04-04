const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/is-logged-in', authMiddleware.authUser, authController.isLoggedin);

module.exports = router;