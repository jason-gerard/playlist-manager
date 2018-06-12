const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/userHelpers');

// sign up route
router.route('/sign-up')
    .post(validateBody(schemas.signUpSchema), UserController.user_sign_up);

module.exports = router;