const express = require('express');
const router = express.Router();

// imports all passport packages and files
const passport = require('passport');
const passportConfig = require('../config/passport');

// requires user controller
const SongController = require('../controllers/songsController');

// all songs
router.route('/')
    .get(SongController.get_all);

// adds song
router.route('/')
    .post(passport.authenticate('jwt', { session: false }), SongController.add_one);

// gets one song
router.route('/:songId')
    .get(SongController.get_one);

// updates song
router.route('/:songId')
    .put(passport.authenticate('jwt', { session: false }), passportConfig.authenticateSongReqById, SongController.update_one);

// deletes song
router.route('/:songId')
    .delete(passport.authenticate('jwt', { session: false }), passportConfig.authenticateSongReqById, SongController.delete_one);

module.exports = router;