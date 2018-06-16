module.exports = {
    port: process.env.PORT || 3000,
    db: {
        database: process.env.DB_NAME || 'playlist-manager',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'password',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
            operatorsAliases: false
        }
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET || 'secret'
    }
}