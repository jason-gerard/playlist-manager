const bcrypt = require('bcryptjs');

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

    // hash password before data is saved to db
    User.beforeSave(async function(user, options) {
        try {
            // generate a salt
            const salt = await bcrypt.genSalt(10);
            // hash password
            const hash = await bcrypt.hash(user.password, salt);
            // assign password
            user.password = hash;
        } catch(error) {
            console.log(err);
        }
    });

    // method to compare hashed passwords
    User.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    // return user schema
    return User;
}