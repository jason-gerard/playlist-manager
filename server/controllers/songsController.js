// imports song model
const { Song } = require('../models');

// helper function to format song data
formatSongData = song => {
    return {
        id: song.id,
        title: song.title,
        user: song.user,
        userId: song.userId,
        coverArt: song.coverArt,
        audioFile: song.audioFile
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

    add_one: async (req, res, next) => {
        try {
            const songData = {
                title: req.body.title,
                user: req.user.username,
                userId: req.user.id,
                coverArt: `http://localhost:3000/${req.files['coverArt'][0].path}`,
                audioFile: `http://localhost:3000/${req.files['audioFile'][0].path}`
            }

            // adds song to db
            const song = await Song.create(songData);

            // sends back new song
            res.status(201).json({
                song: formatSongData(song)
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error uploading the song' + error
            });
        }
    },

    get_one: async (req, res, next) => {
        try {
            // gets song id from params
            const songId = req.params.songId;
            // find song by id
            const song = await Song.findById(songId);

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

    update_one: async (req, res, next) => {
        try {
            // gets song id
            let id = req.params.songId;

            // gets data to be updated
            const songData = req.body;

            // updates song in db
            await Song.update(songData, {
                where: {
                    id
                }
            });

            // sends back success message
            res.status(200).json({
                message: 'Successfully updated song'
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error updating the song'
            });
        }
    },

    delete_one: async (req, res, next) => {
        try {
            // gets song id
            let id = req.params.songId;

            // deletes song in db
            await Song.destroy({
                where: {
                    id
                }
            });

            // sends back success message
            res.status(200).json({
                message: 'Successfully deleted song'
            });
        } catch(error) {
            res.status(500).json({
                error:'There was an error deleting the song'
            });
        }
    }
}