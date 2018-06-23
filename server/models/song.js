module.exports = (sequelize, DataTypes) => {
    // assign song schema to var
    const Song = sequelize.define('Song', {
        title: {
            type: DataTypes.STRING
        },
        user: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        coverArt: {
            type: DataTypes.STRING
        },
        audioFile: {
            type: DataTypes.STRING
        }
    });

    // associations
    Song.associate = function(models) {
        // song to user
        Song.belongsTo(models.User);
    }

    // return song schema
    return Song;
}