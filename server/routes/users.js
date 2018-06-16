const express = require('express');
const router = express.Router();

// requires user controller
const UserController = require('../controllers/users');
// requires auth schemas
const { validateBody, schemas } = require('../helpers/userHelpers');

// sign up route
router.route('/sign-up')
    .post(validateBody(schemas.signUpSchema), UserController.user_sign_up);

// login route
router.route('/sign-in')
    .post(validateBody(schemas.signInSchema), UserController.user_sign_in);

module.exports = router;