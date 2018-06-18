const express = require('express');
const router = express.Router();

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
    .get(UserController.get_user);

// updates user
router.route('/:userId')
    .put(UserController.update_user);

// deletes user
router.route('/:userId')
    .delete(UserController.delete_user);

module.exports = router;