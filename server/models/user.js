const bcrypt = require('bcryptjs');
// import filesystem to generate public folder for user
const fs = require('fs');

// helper function to hash passwords
async function hashPassword(user, options) {
    try {
        // only hash password if it was updated
        if (user.changed('password')) {
            // generate a salt
            const salt = await bcrypt.genSalt(10);
            // hash password
            const hash = await bcrypt.hash(user.password, salt);
            // assign password
            user.password = hash;
        }
    } catch(error) {
        console.log(err);
    }
}

module.exports = (sequelize, DataTypes) => {
    // asigns user schema to var
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    });

    // associations
    User.associate = function(models) {
        // user to songs
        User.hasMany(models.Song);
    }

    // hash password before data is saved to db and when it is updated
    User.beforeSave(hashPassword);

    User.afterCreate((user, options) => {
        let path = `./public/song-data/user-${user.id}`;
        if (!fs.existsSync(path)) {
            // generate public song data folder for user
            fs.mkdirSync(path);
        }
    });

    // method to compare hashed passwords
    User.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    // return user schema
    return User;
}