module.exports = (sequelize, DataTypes) => {
    // assign song schema to var
    const Song = sequelize.define('Song', {
        title: {
            type: DataTypes.STRING
        },
        artist: {
            type: DataTypes.STRING
        },
        coverArt: {
            type: DataTypes.STRING
        }
    });

    // return song schema
    return Song;
}