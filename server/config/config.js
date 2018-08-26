module.exports = {
    port: process.env.PORT || 3000,
    db: {
        database: process.env.DB_NAME || 'playlist-manager',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
            operatorsAliases: false
        }
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET || 'secret'
    },
    multer: {
        destination: function(req, file, cb) {
            cb(null, `./public/song-data/user-${req.user.id}/` );
        },
        filename: function(req, file, cb) {
            if (file.mimetype === 'image/png') {
                cb(null, `song-${req.body.title}.png`);
            } else if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
                cb(null, `song-${req.body.title}.mp3`);
            } else {
                cb(null, file.originalname);
                console.log(`Unknown file type ${file.mimetype}`);
            }
        }
    }
}