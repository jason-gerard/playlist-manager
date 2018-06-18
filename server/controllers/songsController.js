// imports song model
const { Song } = require('../models');

// helper function to format song data
formatSongData = song => {
    return {
        id: song.id,
        title: song.title,
        artist: song.artist,
        coverArt: song.coverArt,
        songPage: '/song/' + song.id
    };
}

module.exports = {
    get_all: async (req, res, next) => {
        try {
            // finds all songs
            const songs = await Song.findAll({});

            // returns array of all songs
            res.status(200).json({
                songs: songs.map(song => {
                    return formatSongData(song)
                })
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error displaying all songs'
            });
        }
    },

    add: async (req, res, next) => {
        try {
            const songData = {
                title: req.body.title,
                artist: req.body.artist,
                coverArt: req.body.coverArt
            }

            // adds song to db
            const song = await Song.create(songData);

            // sends back new song
            res.status(201).json({
                song: formatSongData(song)
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error uploading the song'
            });
        }
    },

    get_one: async (req, res, next) => {
        try {
            // gets song id from params
            const songId = req.params.songId;
            // find song by id
            const song = await Song.findById(songId);

            // checks to see if song exists
            if (!song) {
                return res.status(404).json({
                    error: 'Song not found'
                });
            }

            // sends back song
            res.status(200).json({
                song: formatSongData(song)
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error showing the song'
            });
        }
    },

    update: async (req, res, next) => {
        try {
            const songData = {
                title: req.body.title,
                artist: req.body.artist,
                coverArt: req.body.coverArt
            }
            // updates song in db
            const song = await Song.update(songData, {
                where: {
                    id: req.params.songId
                }
            });

            // sends back song
            res.status(200).json({
                song: formatSongData(song)
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error updating the song ' + error
            });
        }
    }
}