// imports all needed passport packages
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// jwt secret from config file
const { auth } = require('./config');

// imports user and song model
const { User, Song} = require('../models');

// passport jwt strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: auth.jwt_secret
}, async (payload, done) => {
    try {
        // find user in token
        const user = await User.findById(payload.sub);

        // if user isn't found return null with no errors
        if (!user) return done(null, false);

        // if user is found sets req.user
        return done(null, user);

    } catch(error) {
        return done(error, false);
    }
}));

// exports a middleware functions to validate id of token by id of user or song
module.exports = {
    authenticateUserReqById: async (req, res, next) => {
        try {
            // gets id from params
            let paramId = req.params.userId;
            // gets id of user from token
            let userId = req.user.id;

            // compares id by value
            if (paramId != userId) {
                // returns unauthorized error
                return res.status(401).json({
                    error: "You are unauthorized to make this change"
                });
            }

            next();
        } catch(error) {
            // sends back error message
            res.status(500).json({
                error: 'Error has occured authenticating user'
            });
        }
    },

    authenticateSongReqById: async (req, res, next) => {
        try {
            // gets song id from params
            let songId = req.params.songId;
            // gets id of user from token
            let userId = req.user.id;

            // find song by id
            const song = await Song.findById(songId);

            // checks to see if song exists
            if (!song) {
                return res.status(404).json({
                    error: 'Song not found'
                });
            }

            // gets song artist id
            let songUserId = song.userId;

            // compares id by value
            if (userId != songUserId) {
                // returns unauthorized error
                return res.status(401).json({
                    error: "You are unauthorized to make this change"
                });
            }

            next();
        } catch(error) {
            // sends back error message
            res.status(500).json({
                error: 'Error has occured authenticating user or song' + error
            });
        }
    }
}