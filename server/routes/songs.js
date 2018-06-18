const express = require('express');
const router = express.Router();

// requires user controller
const SongController = require('../controllers/songsController');

// all songs
router.route('/')
    .get(SongController.get_all);

// adds song
router.route('/')
    .post(SongController.add);

// gets one song
router.route('/:songId')
    .get(SongController.get_one);

// updates song
router.route('/:songId')
    .put(SongController.update);

module.exports = router;