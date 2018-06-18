const express = require('express');
const router = express.Router();

// requires user controller
const SongController = require('../controllers/songsController');

// all songs
router.route('/')
    .get(SongController.get_all_songs);

// adds song
router.route('/')
    .post(SongController.add_song);

// gets one song
router.route('/:songId')
    .get(SongController.get_song);

// updates song
router.route('/:songId')
    .put(SongController.update_song);

// deletes song
router.route('/:songId')
    .delete(SongController.delete_song);

module.exports = router;