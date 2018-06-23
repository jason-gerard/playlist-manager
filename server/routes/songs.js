const express = require('express');
const router = express.Router();

// imports multer for file uploading
const multer = require('multer');
// multer config
const { multer: multerConfig } = require('../config/config');
const storage = multer.diskStorage(multerConfig);
const upload = multer({storage});
let songData = [{ name: 'coverArt', maxCount: 1 }, { name: 'audioFile', maxCount: 1 }];

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
    .post(passport.authenticate('jwt', { session: false }), upload.fields(songData), SongController.add_one);

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