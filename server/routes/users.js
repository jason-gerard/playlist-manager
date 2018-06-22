const express = require('express');
const router = express.Router();

// imports all passport packages and files
const passport = require('passport');
const passportConfig = require('../config/passport');

// requires user controller
const UserController = require('../controllers/usersController');
// requires auth schemas
const { validateBody, schemas } = require('../helpers/userHelpers');

// sign up route
router.route('/sign-up')
    .post(validateBody(schemas.signUpSchema), UserController.sign_up);

// login route
router.route('/sign-in')
    .post(validateBody(schemas.signInSchema), UserController.sign_in);

// gets user profile
router.route('/:userId')
    .get(UserController.get_one);

// updates user
router.route('/:userId')
    .put(passport.authenticate('jwt', { session: false }), passportConfig.authenticateUserReqById, UserController.update_one);

// deletes user
router.route('/:userId')
    .delete(passport.authenticate('jwt', { session: false }), passportConfig.authenticateUserReqById, UserController.delete_one);

module.exports = router;