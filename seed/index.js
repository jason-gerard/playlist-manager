// importing all models
const {
    sequelize,
    Song,
    User
} = require('../server/models');

// imports json files
const songs = require('./songs.json');
const users = require('./users.json');

// syncs db with force to true to reset the db
sequelize.sync({force: true})
    .then(() => {
        // add all users in json file to db
        users.map(user => {
            User.create(user)
        });

        // add all songs in json file to db
        songs.map(song => {
            Song.create(song)
        });
    });