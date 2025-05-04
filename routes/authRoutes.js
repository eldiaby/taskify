const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController.js');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

module.exports = router;
