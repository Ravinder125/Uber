const authController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/is-logged-in', authController.isLoggedin);

module.exports = router;