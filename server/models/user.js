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

    // return user schema
    return User;
}