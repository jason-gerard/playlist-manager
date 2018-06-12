const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

// sign up route
router.route('/sign-up')
    .post(UserController.user_sign_up);

module.exports = router;